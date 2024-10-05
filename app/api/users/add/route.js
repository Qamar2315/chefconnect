import dbConnect from '@utils/connectDB';
import User from '@models/user';
import { NextResponse } from 'next/server';

export async function POST(req, res) {
    try {
        await dbConnect();
        let data = await req.json();
        data.recipes=[];
        // console.log(data);
        const user = await User.create(data);
        return NextResponse.json({ success: true, data: user });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            status: 500,
            message: 'Internal server error',
        });
    }
}