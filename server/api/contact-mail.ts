export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const { sendMail } = useNodeMailer()

  const { subject, text, from }: { subject: string; text: string; from: string } = await readBody(event)

  return sendMail({ subject, text, from, to: config.public.CONTACT_MAIL })
})
