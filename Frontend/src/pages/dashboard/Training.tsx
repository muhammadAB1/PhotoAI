import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { UploadModal } from '@/components/ui/upload'
import axios from 'axios'
import { BACKEND_URL } from '@/config'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import { useTheme } from "@/components/ThemeProvider";



const Training = () => {
    const { theme } = useTheme();
    const navigate = useNavigate();
    const { getToken } = useAuth();

    const [zipUrl, setZipUrl] = useState("abrar");
    const [type, setType] = useState("Man")
    const [age, setAge] = useState<string>()
    const [ethnicity, setEthinicity] = useState<string>()
    const [eyeColor, setEyeColor] = useState<string>()
    const [bald, setBald] = useState(false)
    const [name, setName] = useState("")

    async function trainModal() {
        const input = {
            zipUrl,
            type,
            age: parseInt(age ?? "0"),
            ethnicity,
            eyeColor,
            bald,
            name
        }
        const token = await getToken()
        await axios.post(`${BACKEND_URL}/ai/training`, input, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        navigate('/')
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Card className="w-[700px] px-4">
                <CardHeader>
                    <CardTitle>Create project</CardTitle>
                    <CardDescription>Deploy your new project in one-click.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <div className='flex gap-2'>
                            <div className="flex flex-col space-y-1.5 flex-1/2">
                                <Label htmlFor="name">Name</Label>
                                <Input onChange={(e) => setName(e.target.value)} id="name" placeholder="Name of the model" />
                            </div>
                            <div className="flex flex-col space-y-1.5 flex-1/2">
                                <Label htmlFor="name">Type</Label>
                                <Select onValueChange={(value) => {
                                    setType(value)
                                }}>
                                    <SelectTrigger id="name">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent position="popper" className={`${theme === "dark" ? "bg-black" : "bg-white"}`}>
                                        <SelectItem value="Man">Man</SelectItem>
                                        <SelectItem value="Woman">Woman</SelectItem>
                                        <SelectItem value="Others">Others</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className='flex gap-2'>
                        <div className="flex flex-col space-y-1.5 flex-1/2">
                            <Label htmlFor="name">Age</Label>
                            <Input id="name" placeholder="Age of the model" onChange={(e) => {
                                setAge(e.target.value)
                            }} />
                        </div>
                        <div className="flex flex-col space-y-1.5 flex-1/2">
                            <Label htmlFor="name">Ethinicity</Label>
                            <Select onValueChange={(value) => {
                                setEthinicity(value)
                            }}>
                                <SelectTrigger id="name">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent position="popper" className={`${theme === "dark" ? "bg-black" : "bg-white"}`}>
                                    <SelectItem value="White">White</SelectItem>
                                    <SelectItem value="Black">Black</SelectItem>
                                    <SelectItem value="Asian_American">Asian American</SelectItem>
                                    <SelectItem value="East_Asian">East Asian</SelectItem>
                                    <SelectItem value="South_East_Asian">South East Asian</SelectItem>
                                    <SelectItem value="South_Asian">South Asian</SelectItem>
                                    <SelectItem value="Middle_Eastern">Middle Eastern</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Eye Color</Label>
                            <Select onValueChange={(value) => {
                                setEyeColor(value)
                            }}>
                                <SelectTrigger id="name">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent position="popper" className={`${theme === "dark" ? "bg-black" : "bg-white"}`}>
                                    <SelectItem value="Brown">Brown</SelectItem>
                                    <SelectItem value="Blue">Blue</SelectItem>
                                    <SelectItem value="Hazel">Hazel</SelectItem>
                                    <SelectItem value="Gray">Gray</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name">Bald</Label>
                        <Switch className='cursor-pointer' onClick={() => {
                            setBald(!bald)
                        }}/>
                        </div>
                        <UploadModal onUploadDone={(zipUrl) => {
                            setZipUrl(zipUrl)
                        }} />
                        {/* <UploadModal /> */}
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button className='cursor-pointer' variant="outline" onClick={() => {
                        // router.push("/")
                    }}>Cancel</Button>
                    <Button className='cursor-pointer'
                        // disabled={!name || !zipUrl || !type || !age || !ethnicity || !eyeColor }
                        onClick={trainModal}
                    >Create Model</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Training
