import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;
    
    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email dan password diperlukan' },
        { status: 400 }
      );
    }
    
    // Query the user from database
    const [users] = await db.query(
      'SELECT * FROM akun WHERE email = ?',
      [email]
    );
    
    const userArray = users as any[];
    
    if (!userArray || userArray.length === 0) {
      return NextResponse.json(
        { error: 'Email atau password salah' },
        { status: 401 }
      );
    }
    
    const user = userArray[0];
    
    // Simple password comparison (since you're storing plain text passwords)
    const passwordMatch = password === user.password;
    
    if (!passwordMatch) {
      return NextResponse.json(
        { error: 'Email atau password salah' },
        { status: 401 }
      );
    }
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Login berhasil',
      user: {
        username: user.username,
        email: user.email
      }
    });
    
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat login' },
      { status: 500 }
    );
  }
}