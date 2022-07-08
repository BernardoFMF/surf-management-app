'use strict'

const eventTemplate = (name_, initial_date_, final_date_) => {
	const text = `Novo Evento: ${name_} Data do evento: ${initial_date_}`
	const html = `<h1> Novo Evento </h1>
					<h2> ${name_} </h2> 
					<h4> Data de início do evento: ${initial_date_} </h4>
					<h4> Data de fim do evento: ${final_date_} </h4>`
	return {text, html}
}

const notifyTemplate = (date, value) => {
	const text = `A quota de ${date} no valor de ${value} euros encontra-se com o pagamento pendente.`
	const html = `
					<h4> A quota de ${date} no valor de ${value} euros encontra-se com o pagamento pendente. </h4> 
					<h4> Qualquer dúvida não hesite em nos contactar. </h4>
					<p/>
					<h4> Cumprimentos da equipa, </h4>
					<h4> Ericeira Surf Club </h4>
				`
	return {text, html}
}

const approvalTemplate = (full_name, role) => {
	const text = `Viva ${full_name},`
	const html = `
					<h4> Viva ${full_name}, </h4> 
					<p> Foi aprovado no clube, na categoria de ${role}.</p>
					<p> Qualquer dúvida não hesite em nos contactar.</p>
					<p> Cumprimentos da equipa, </p>
					<p> Ericeira Surf Club </p>
				`
	return {text, html}
}

const quotaAlertTemplate = (date_) => {
	const text = `Nova quota(${date_}) lançada não se esqueça de pagá-la`
	const html = `<h1> Nova quota(${date_}) lançada não se esqueça de pagá-la</h1>`
	return {text, html}
}

const passwordChangeTemplate = (url) => {
	const text = `Pedido de alteração de palavra-passe caso tenha sido você aceda ao seguinte url:${url}`
	const html = `<!DOCTYPE html><html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml"><head><title></title><meta content="text/html; charset=utf-8" http-equiv="Content-Type"/><meta content="width=device-width, initial-scale=1.0" name="viewport"/><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--><!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css"/><link href="https://fonts.googleapis.com/css?family=Cabin" rel="stylesheet" type="text/css"/><!--<![endif]--><style>* {box-sizing: border-box;}body {margin: 0;padding: 0;}a[x-apple-data-detectors] {color: inherit !important;text-decoration: inherit !important;}#MessageViewBody a {color: inherit;text-decoration: none;}p {line-height: inherit}.desktop_hide,.desktop_hide table {mso-hide: all;display: none;max-height: 0px;overflow: hidden;}@media (max-width:620px) {.desktop_hide table.icons-inner {display: inline-block !important;}.icons-inner {text-align: center;}.icons-inner td {margin: 0 auto;}.image_block img.big,.row-content {width: 100% !important;}.mobile_hide {display: none;}.stack .column {width: 100%;display: block;}.mobile_hide {min-height: 0;max-height: 0;max-width: 0;overflow: hidden;font-size: 0px;}.desktop_hide,.desktop_hide table {display: table !important;max-height: none !important;}}</style></head><body style="background-color: #d9dffa; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;"><table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #d9dffa;" width="100%"><tbody><tr><td><table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #cfd6f4;" width="100%"><tbody><tr><td><table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 600px;" width="600"><tbody><tr><td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 20px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%"><div class="spacer_block" style="height:60px;line-height:60px;font-size:1px;"> </div></td></tr></tbody></table></td></tr></tbody></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #d9dffa; background-image: url('images/body_background_2.png'); background-position: top center; background-repeat: repeat;" width="100%"><tbody><tr><td><table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 600px;" width="600"><tbody><tr><td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-left: 50px; padding-right: 50px; padding-top: 15px; padding-bottom: 15px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%"><table border="0" cellpadding="10" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%"><tr><td><div style="font-family: sans-serif"><div class="txtTinyMce-wrapper" style="font-size: 14px; mso-line-height-alt: 16.8px; color: #506bec; line-height: 1.2; font-family: Helvetica Neue, Helvetica, Arial, sans-serif;"><p style="margin: 0; font-size: 14px;"><strong><span style="font-size:38px;">Esqueceu-se da sua palavra passe?</span></strong></p></div></div></td></tr></table><table border="0" cellpadding="10" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%"><tr><td><div style="font-family: sans-serif"><div class="txtTinyMce-wrapper" style="font-size: 14px; mso-line-height-alt: 16.8px; color: #40507a; line-height: 1.2; font-family: Helvetica Neue, Helvetica, Arial, sans-serif;"><p style="margin: 0; font-size: 14px;"><span style="font-size:16px;">Recebemos um pedido para alterar a sua palavra passe.</span></p></div></div></td></tr></table><table border="0" cellpadding="10" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%"><tr><td><div style="font-family: sans-serif"><div class="txtTinyMce-wrapper" style="font-size: 14px; mso-line-height-alt: 16.8px; color: #40507a; line-height: 1.2; font-family: Helvetica Neue, Helvetica, Arial, sans-serif;"><p style="margin: 0; font-size: 14px;"><span style="font-size:16px;">Para realizar a alteração clique no botão abaixo.</span></p></div></div></td></tr></table><table border="0" cellpadding="0" cellspacing="0" class="button_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%"><tr><td style="padding-bottom:20px;padding-left:10px;padding-right:10px;padding-top:20px;text-align:left;"><!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${url}" style="height:48px;width:209px;v-text-anchor:middle;" arcsize="34%" stroke="false" fillcolor="#506bec"><w:anchorlock/><v:textbox inset="5px,0px,0px,0px"><center style="color:#ffffff; font-family:Arial, sans-serif; font-size:15px"><![endif]--><a href="${url}" style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#506bec;border-radius:16px;width:auto;border-top:0px solid TRANSPARENT;font-weight:400;border-right:0px solid TRANSPARENT;border-bottom:0px solid TRANSPARENT;border-left:0px solid TRANSPARENT;padding-top:8px;padding-bottom:8px;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;" target="_blank"><span style="padding-left:25px;padding-right:20px;font-size:15px;display:inline-block;letter-spacing:normal;"><span style="font-size: 16px; line-height: 2; word-break: break-word; mso-line-height-alt: 32px;"><span data-mce-style="font-size: 15px; line-height: 30px;" style="font-size: 15px; line-height: 30px;"><strong>Alterar a palavra passe</strong></span></span></span></a><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></td></tr></table><table border="0" cellpadding="10" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%"><tr><td><div style="font-family: sans-serif"><div class="txtTinyMce-wrapper" style="font-size: 14px; mso-line-height-alt: 16.8px; color: #40507a; line-height: 1.2; font-family: Helvetica Neue, Helvetica, Arial, sans-serif;"><p style="margin: 0; font-size: 14px;"><span style="font-size:14px;">Está com problemas? <strong>@ericeirasurfclub@outlook.com</strong></span></p></div></div></td></tr></table><table border="0" cellpadding="10" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%"><tr><td><div style="font-family: sans-serif"><div class="txtTinyMce-wrapper" style="font-size: 14px; mso-line-height-alt: 16.8px; color: #40507a; line-height: 1.2; font-family: Helvetica Neue, Helvetica, Arial, sans-serif;"><p style="margin: 0; font-size: 14px;">Se não pediu para alterar a password contacte a administração.</p></div></div></td></tr></table></td></tr></tbody></table></td></tr></tbody></table></body></html>`	
	return {text, html}
}

const passwordChangedTemplate = () => {
	const text = 'A palavra pass foi alterado com sucesso:'
	const html = '<h1> A palavra pass foi alterado com sucesso</h1>'
	return {text, html}
}

const contactUsTemplate = (from, name, topic, content) => {
	const text = `Email: ${from}\nNome: ${name}\nTópico: ${topic}\nConteúdo: ${content}`
	const html = `<p'>Novo email de: <strong><a href = "mailto: ${from}">${from}</a></strong> [${name}]</p>
		<hr style='border-top: 3px solid #bbb;'>
		<p>Assunto: ${topic}</p>
		<hr style='border-top: 3px solid #bbb;'>
		<p>${content}</p>`
	return {text, html}
}

const credentialsChangedTemplate = () => {
	const text = 'As suas credenciais foram alteradas com sucesso.'
	const html = '<h1>As suas credenciais foram alteradas com sucesso.</h1>'
	return {text, html}
}

export{eventTemplate, quotaAlertTemplate, passwordChangeTemplate, passwordChangedTemplate, contactUsTemplate, notifyTemplate, credentialsChangedTemplate, approvalTemplate}
