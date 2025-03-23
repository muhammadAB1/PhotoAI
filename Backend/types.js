import { z } from "zod";


export const trainModel = z.object({
    name: z.string(),
    type: z.enum(['Man', 'Woman', 'Other']),
    age: z.number(),
    ethnicity: z.enum(["White", 
        "Black", 
        "Asian_American", 
        "East_Asian",
        "South_East_Asian", 
        "South_Asian", 
        "Middle_Eastern", 
        "Pacific", 
        "Hispanic"]),
    eyeColor: z.enum(["Brown", "Blue", "Hazel", "Gray"]),
    bald: z.boolean(),
    zipUrl: z.string(),
})


export const generateImage = z.object({
    prompt: z.string(),
    modelId: z.string(),
    num: z.number()
})

export const generateImagesFromPack = z.object({
    modelId: z.string(),
    packId: z.string()
})