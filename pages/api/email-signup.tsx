import type { NextApiRequest, NextApiResponse } from 'next'

import escape from "escape-html"
import nodemailer from "nodemailer";

import React from "react"
import ReactDOMServer from 'react-dom/server';

function Email({ data }: { data: { [k: string]: string } }) {
    const entries = Object.entries(data)
    return (
        <html>
            <body>{
                entries.map(
                    ([ k, v ]) => {
                        const label = escape(k)
                        const value = escape(v)
                        return <p key={label}>
                           <strong>{label}</strong>: {value}
                        </p>
                    }
                )
            }</body>
        </html>
    )
}

// WIP, still using bat/rd-mailform.php
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        console.log("405…", req.method)
        res.status(405)
    }
    console.log("body:", req.body)
    // const { email, firstname, lastname, phone, message } = req.body

    const host: string = process.env.MAIL_SMTP
    const port: number = parseInt(process.env.MAIL_PORT)
    const user: string = process.env.MAIL_USER
    const from: string = process.env.MAIL_FROM || user
    const pass: string = process.env.MAIL_PSWD
    const to: string = process.env.MAIL_RECV
    const cc: string = process.env.MAIL_CC

    const subject = "embankment.org: new email list signup"

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host,
        port,
        secure: false,
        auth: { user, pass, },
    });

    // {
    //     email,
    //     firstname,
    //     lastname,
    //     phone,
    //     message
    // }

    const text = JSON.stringify(req.body, null, 2)
    const html = ReactDOMServer.renderToStaticMarkup(<Email data={req.body} />)

    // send mail with defined transport object
    let info = await transporter.sendMail({ from, to, cc, subject, text, html, });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    res.status(200).json({ code: "MF000" })
}
