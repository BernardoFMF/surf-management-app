'use strict'

const eventTemplate = (name_, initial_date_, final_date_) => {
	const text = `Novo Evento: ${name_} Data do evento: ${initial_date_}`
	const html = `<h1> Novo Evento ${name_} Data do evento: ${initial_date_}</h1>`
	return {text, html}
}

const quotaAlertTemplate = (date_) => {
	const text = `Nova quota(${date_}) lançada não se esqueça de pagá-la`
	const html = `<h1> Nova quota(${date_}) lançada não se esqueça de pagá-la</h1>`
	return {text, html}
}

const passwordChangeTemplate = (url) => {
	const text = `Pedido de alteração de palavra-passe caso tenha sido você aceda ao seguinte url:${url}`
	const html = `<h1> Pedido de alteração de palavra-passe caso tenha sido você aceda ao seguinte url:${url}</h1>`
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
	console.log(text);
	console.log(html);
	return {text, html}
}

const credentialsChangedTemplate = () => {
	const text = 'As suas credenciais foram alteradas com sucesso.'
	const html = '<h1>As suas credenciais foram alteradas com sucesso.</h1>'
	return {text, html}
}

export{eventTemplate, quotaAlertTemplate, passwordChangeTemplate, passwordChangedTemplate, contactUsTemplate, credentialsChangedTemplate}