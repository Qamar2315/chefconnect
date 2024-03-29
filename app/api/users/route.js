import dbConnect from '@utils/connectDB';
import User from '@models/user';
import { NextResponse } from 'next/server';

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