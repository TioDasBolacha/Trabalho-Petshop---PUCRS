function atualizarDataHora() {

    const elementoSaudacao = document.getElementById("saudacao");
    const elementoDataHora = document.getElementById("dataHora");

    if (elementoSaudacao && elementoDataHora) {

        const agora = new Date();

        const horaAtual = agora.getHours();

        let saudacao;

        if (horaAtual < 12) {
            saudacao = "Bom dia! Seja bem-vindo ao PetShop Amigo Fiel!";
        } else if (horaAtual < 18) {
            saudacao = "Boa tarde! Seja bem-vindo ao PetShop Amigo Fiel!";
        } else {
            saudacao = "Boa noite! Seja bem-vindo ao PetShop Amigo Fiel!";
        }

        const data = agora.toLocaleDateString("pt-BR");
        const hora = agora.toLocaleTimeString("pt-BR");

        elementoSaudacao.textContent = saudacao;

        elementoDataHora.textContent =
            "Hoje é " + data + " - " + hora;
    }
}

atualizarDataHora();

setInterval(atualizarDataHora, 1000);


function definirDataMinima() {

    const campoData = document.getElementById("dataAgendamento");
    const campoHora = document.getElementById("horaAgendamento");

    if (campoData && campoHora) {

        const hoje = new Date();

        const ano = hoje.getFullYear();
        const mes = String(hoje.getMonth() + 1).padStart(2, "0");
        const dia = String(hoje.getDate()).padStart(2, "0");

        const dataAtual = ano + "-" + mes + "-" + dia;

        // Impede selecionar uma data anterior ao dia atual
        campoData.min = dataAtual;

        // Horário de funcionamento do PetShop
        const horarioAbertura = "09:00";
        const horarioFechamento = "19:00";

        // Define o limite inicial e final do horário
        campoHora.min = horarioAbertura;
        campoHora.max = horarioFechamento;


        // Verifica a data escolhida
        campoData.addEventListener("change", function () {

            if (campoData.value === dataAtual) {

                const agora = new Date();

                const horas = String(agora.getHours()).padStart(2, "0");
                const minutos = String(agora.getMinutes()).padStart(2, "0");

                const horaAtual = horas + ":" + minutos;

                // Se ainda estiver dentro do horário de funcionamento, o horário mínimo passa a ser o horário atual.
                if (horaAtual > horarioAbertura &&
                    horaAtual < horarioFechamento) {

                    campoHora.min = horaAtual;

                } else {

                    campoHora.min = horarioAbertura;
                }

            } else {

                // Para datas futuras, volta ao horário normal de funcionamento
                campoHora.min = horarioAbertura;
            }
        });
    }
}

definirDataMinima();


const formulario = document.getElementById("formCadastro");

if (formulario) {

    formulario.addEventListener("submit", function(event) {

        const dataAgendamento =
            document.getElementById("dataAgendamento").value;

        const horaAgendamento =
            document.getElementById("horaAgendamento").value;

        const servicosSelecionados =
            document.querySelectorAll('input[name="servico"]:checked');

        if (servicosSelecionados.length === 0) {
            event.preventDefault();
            alert("Selecione pelo menos um serviço.");
            return;
        }

        let textoServico = "";

        if (servicosSelecionados.length === 2) {
            textoServico = "Banho e Tosa";
        } else {
            if (servicosSelecionados[0].value === "banho") {
                textoServico = "Banho";
            } else {
                textoServico = "Tosa";
            }
        }

        const atendimento =
            document.querySelector('input[name="atendimento"]:checked').value;

    const dataFormatada =
    dataAgendamento.split("-").reverse().join("/");

let textoAtendimento;

if (atendimento === "tele-busca") {
    textoAtendimento = "Tele-busca";
} else {
    textoAtendimento = "Levar o pet ao PetShop";
}


        const hoje = new Date();

        const ano = hoje.getFullYear();
        const mes = String(hoje.getMonth() + 1).padStart(2, "0");
        const dia = String(hoje.getDate()).padStart(2, "0");

        const dataAtual = ano + "-" + mes + "-" + dia;

        const horarioAbertura = "09:00";
        const horarioFechamento = "19:00";


        // Validação da data

        if (dataAgendamento < dataAtual) {

            event.preventDefault();

            alert("A data do agendamento não pode ser anterior à data atual.");

            return;
        }


        // Validação do horário de funcionamento

        if (horaAgendamento < horarioAbertura ||
            horaAgendamento > horarioFechamento) {

            event.preventDefault();

            alert("O horário de atendimento é das 09:00 às 19:00.");

            return;
        }


        // Validação para o caso de escolher o dia atual

            if (dataAgendamento === dataAtual) {

            const horas = String(hoje.getHours()).padStart(2, "0");
            const minutos = String(hoje.getMinutes()).padStart(2, "0");

            const horaAtual = horas + ":" + minutos;

            if (horaAgendamento < horaAtual) {

                event.preventDefault();

                alert("O horário escolhido já passou. Escolha um horário futuro.");

                return;
            }
        }

event.preventDefault();

const conteudoModal =
    document.getElementById("conteudoModal");

conteudoModal.innerHTML =
    "<p><strong>Serviço:</strong> " + textoServico + "</p>" +
    "<p><strong>Atendimento:</strong> " + textoAtendimento + "</p>" +
    "<p><strong>Data:</strong> " + dataFormatada + "</p>" +
    "<p><strong>Horário:</strong> " + horaAgendamento + "</p>";

const modal = new bootstrap.Modal(
    document.getElementById("modalCadastro")
);

modal.show();

});
}