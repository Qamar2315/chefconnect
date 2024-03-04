import dbConnect from '@utils/connectDB';
import User from '@models/user';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
    const id = params.id;
    console.log(id);
    try {
        await dbConnect();
        const user = await User.findById(id);
        if (!user) {
            return NextResponse.json({
                status: 404,
                message: 'User not found',
            });
        }
        return NextResponse.json(user);
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            status: 500,
            message: 'Internal server error',
        });
    }
}

export async function PUT(req, { params }) {
    const id = params.id;
    const data = await req.json();
    try {
        await dbConnect();
        const user = await User.findByIdAndUpdate(id, data, { new: true });
        if (!user) {
            return NextResponse.json({
                status: 404,
                message: 'User not found',
            });
        }
        return NextResponse.json(user);
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            status: 500,
            message: 'Internal server error',
        });
    }
}
