export default defineEventHandler(async (event) => {
  const { sendMail } = useNodeMailer()

  const { subject, text, from }: { subject: string; text: string; from: string } = await readBody(event)

  return sendMail({ subject, text, from, to: process.env.NODEMAILER_USER })
})
