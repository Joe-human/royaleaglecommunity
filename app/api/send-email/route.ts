import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, modal, userShare, broker, accountType } = body;

    // Konfigurasi transporter SMTP Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'royaleagle.fx1@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD, // Disimpan di file .env.local
      },
    });

    // Format Email yang masuk ke inbox royaleagle.fx1@gmail.com
    const mailOptions = {
      from: 'System RoyalEagleFX <royaleagle.fx1@gmail.com>',
      to: 'royaleagle.fx1@gmail.com',
      subject: `[Pengajuan Copytrade Baru] - ${fullName}`,
      html: `
        <h2>Pengajuan Akun Copytrade Baru</h2>
        <p><strong>Nama Lengkap:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Nomor WhatsApp:</strong> ${phone}</p>
        <p><strong>Target Modal:</strong> ${modal}</p>
        <p><strong>Skema Bagi Hasil:</strong> ${userShare}% Investor</p>
        <p><strong>Broker Mitra:</strong> ${broker}</p>
        <p><strong>Jenis Akun MetaTrader:</strong> ${accountType}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Email berhasil terkirim!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ success: false, message: 'Gagal mengirim email.' }, { status: 500 });
  }
}