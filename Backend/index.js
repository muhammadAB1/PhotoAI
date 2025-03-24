import express from 'express'
import { config } from 'dotenv'
import cors from 'cors'
import { trainModel, generateImage, generateImagesFromPack } from './types.js';
import { prismaClient } from './db/index.js';
import { skip } from '@prisma/client/runtime/library';
import { FalAIModel } from './models/FalAIModel.js';
import { S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { authMiddleware } from './api/middleware.js';


config();
const app = express()

app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 8080

const falAiModel = new FalAIModel()

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY,
    },
    endpoint: process.env.ENDPOINT,
});

app.get("/pre-signed-url", async (req, res) => {
    const key = `models/${Date.now()}_${Math.random()}.zip`;

    const url = await getSignedUrl(s3, {
        Bucket: process.env.BUCKET_NAME,
        Key: key,
        Expires: 300
    }, { method: "PUT" });

    res.json({ url, key });
})

app.get("/models", authMiddleware, async (req, res) => {
    const models = await prismaClient.model.findMany({
        where: {
            OR: [{ userId: req.userId }, { open: true }],
        },
    });

    res.json({
        models,
    });
})

app.post('/ai/training', authMiddleware, async (req, res) => {
    try {
        const parsedBody = trainModel.safeParse(req.body)
        if (!parsedBody.success) {
            res.status(411).json({
                message: 'Input incorrect'
            })
            return
        }
        const { request_id, response_url } = await falAiModel.trainModel(parsedBody.data.zipUrl, parsedBody.data.name)

        const data = await prismaClient.model.createMany({
            data: {
                name: parsedBody.data.name,
                type: parsedBody.data.type,
                age: parsedBody.data.age,
                ethnicity: parsedBody.data.ethnicity,
                eyeColor: parsedBody.data.eyeColor,
                bald: parsedBody.data.bald,
                zipUrl: response_url,
                falAiRequestId: request_id,
                userId: req.userId,
            }
        })
        res.json({
            modelId: data
        })
    } catch (error) {
        console.error("Error in /ai/training:", error);
        res.status(500).json({
            message: "Training failed",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }

})

app.post('/ai/generate', authMiddleware, async (req, res) => {
    const parsedBody = generateImage.safeParse(req.body)
    console.log(parsedBody)

    if (!parsedBody.success) {
        res.status(411).json({
            message: 'Input incorrect'
        })
        return
    }

    const model = await prismaClient.model.findUnique({
        where: {
            id: parsedBody.data.modelId
        }
    })

    if (!model || !model.tensorPath) {
        res.status(411).json({
            message: "Model not found",
        });
        return;
    }

    const request_id = await falAiModel.generateImage(parsedBody.data.prompt, model.tensorPath)

    const data = await prismaClient.outputImages.create({
        data: {
            prompt: parsedBody.data.prompt,
            userId: req.userId,
            modelId: parsedBody.data.modelId,
            imageUrl: '',
            falAiRequestId: request_id
        }
    })
    res.json({
        imageId: data.id
    })
})

app.post('/pack/generate', authMiddleware, async (req, res) => {
    const parsedBody = generateImagesFromPack.safeParse(req.body)

    if (!parsedBody.success) {
        res.status(411).json({
            message: 'Input incorrect'
        })
    }

    const prompts = await prismaClient.packPrompts.findMany({
        where: {
            packId: parsedBody.data.packId
        }
    })

    const model = await prismaClient.model.findFirst({
        where: {
            id: parsedBody.data.modelId
        },
    })

    if (!model) {
        res.status(411).json({
            message: "Model not found",
        });
        return;
    }

    let requestIds =
        await Promise.all(prompts.map((prompt) => {
            falAiModel.generateImage(prompt.prompt, model.tensorPath)
        }))
    const images = await prismaClient.outputImages.createManyandReturn({
        data: prompts.map((prompt, index) => ({
            prompt: prompt.prompt,
            userId: req.userId,
            modelId: parsedBody.data.modelId,
            imageUrl: '',
            falAiRequestId: requestIds[index].request_id
        }))
    })

    res.json({
        images: images.map((image) => image.id)
    })
})

app.get('/pack/bulk', async (req, res) => {
    const packs = await prismaClient.packs.findMany({})
    res.json({
        packs
    })
})

app.get('/image/bulk', authMiddleware, async (req, res) => {
    const ids = req.query.ids ?? []
    const offset = parseInt(req.query.offset) || 0;
    const limit = parseInt(req.query.limit) || 100;

    const imagesData = await prismaClient.outputImages.findMany({
        where: {
            // id: { in: ids },
            userId: req.userId,
            status: {
                not: "Failed",
            },
        },

        skip: offset,
        take: limit,
    })
    res.json({
        images: imagesData
    })
})

app.post('fal-ai/webhook/train', async (req, res) => {
    console.log(req.body)

    const requestId = req.body.request_id

    if (req.body.status === "COMPLETED" || req.body.status === "OK") {
        try {
            // Check if we have payload data directly in the webhook
            let loraUrl;
            if (req.body.payload && req.body.payload.diffusers_lora_file && req.body.payload.diffusers_lora_file.url) {
                // Extract directly from webhook payload
                loraUrl = req.body.payload.diffusers_lora_file.url;
                console.log("Using lora URL from webhook payload:", loraUrl);
            } else {
                // Fetch result from fal.ai if not in payload
                console.log("Fetching result from fal.ai");
                const result = await fal.queue.result("fal-ai/flux-lora-fast-training", {
                    requestId,
                });
                console.log("Fal.ai result:", result);
                const resultData = result.data;
                loraUrl = resultData.diffusers_lora_file.url;
            }

            const { imageUrl } = await falAiModel.generateImageSync(loraUrl);

            await prismaClient.model.updateMany({
                where: {
                    falAiRequestId: requestId
                },
                data: {
                    trainingStatus: 'Generated',
                    tensorPath: req.body.tensor_path,
                    thumbnail: imageUrl
                }
            })

            res.json({
                message: 'Webhook received'
            })
        } catch (error) {
            console.error("Error in /fal-ai/webhook/train:", error);
            res.status(500).json({
                message: "Training failed",
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    }
})

app.post('fal-ai/webhook/image', async (req, res) => {
    console.log(req.body)

    const requestId = req.body.request_id;
    const imageId = req.body.image_id;

    await prismaClient.outputImages.updateMany({
        where: {
            falAiRequestId: requestId
        },
        data: {
            status: 'Generated',
            imageUrl: req.body.image_url
        }
    })
    res.json({
        message: 'Webhook received'
    })
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})



