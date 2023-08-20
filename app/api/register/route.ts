import { NextResponse } from "next/server"
import User from "../../../models/user"
import { connectMongoDB } from "@/lib/mongodb"
import bcrypt from "bcryptjs"

export async function POST(req: Request, res: Response) {
    try {
        await connectMongoDB();
        const { name, email, password } = await req.json()
        if (!name || !email || !password) return NextResponse.json({ message: "Please fill all the fields" }, { status: 400 })
        const user = await User.findOne({ email });
        if (user) return NextResponse.json({ message: "User already exists" }, { status: 400 })
        const hashedPassword = await bcrypt.hash(password, 10)
        await User.create({ name, email, password: hashedPassword })
        return NextResponse.json({ message: "User Registered" }, { status: 200 })
    } catch (error) {

        return NextResponse.json({ message: "Something went completely wrong" }, { status: 500 })
    }
}