import dbConnect from '@utils/connectDB';
import User from '@models/user';
import { NextResponse } from 'next/server';


export async function POST(req, res) {
    try {
        await dbConnect();
        let data = await req.json();
        data.recipes=[]
        const user = await User.create(data);
        console.log(user);
        return NextResponse.json({ success: true, data: user });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            status: 500,
            message: 'Internal server error',
        });
    }
}

export async function GET(req, res) {
    try {
        await dbConnect();
        const users = await User.find({});
        return NextResponse.json({ success: true, data: users });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            status: 500,
            message: 'Internal server error',
        });
    }
}