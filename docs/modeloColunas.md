# Documento de características das colunas

Informações importantes a serem ressaltadas, as colunas em Colunas inseridas na criação do processo que serão inseridas manualmente possuirão campos no formulário de criação do processo. As colunas que dependem de outros valores, se possível, serão adicionadas automaticamente a partir das regras de negócio dentro da aplicação.



# Colunas inseridas na criação do processo:

Estas colunas estarão presentes tanto no formulário de criação de processo quanto no formulário de edição de processo.

## Sit:

- Depende de Tipo, Status e Processo.

- Possui 4 valores possíveis:
    - Vazio -> Se coluna Tipo vazia.
    - C -> Se coluna Status for cancelado.
    - P -> Se coluna Processo vazia.
    - Ok -> Caso não cair em nenhum dos casos acima.

- Como depende de outras colunas, será preenchida automaticamente, sem a necessidade de estar no formulário de criação do processo.

## Tipo:

- Inserida manualmente no formulário de criação do processo.

- Possui 3 valores possíveis:

    - Criação.
    - Mídia.
    - Produção.

- Não pode ser nula.

## Cliente:

- Inserida manualmente no formulário de criação do processo.

- Não pode ser nula.

## Projeto:

- Inserida manualmente no formulário de criação do processo.

- Não pode ser nula.

## Doc:

- Inserida manualmente no formulário de criação do processo.

- Não pode ser nula.

## Campanha:

- Inserida manualmente no formulário de criação do processo.

- Não pode ser nula.

## Job/Peça:

- Inserida manualmente no formulário de criação do processo.

- Não pode ser nula.

## Autorizado:

- Inserida manualmente no formulário de criação do processo.

- Não pode ser nula.

## Responsável:

- Inserida manualmente no formulário de criação do processo.

- A definir se pode ser nula ou não.

## Status:

- Inserida manualmente no formulário de criação do processo.

- Não pode ser nula.

## Meio:

- Inserida manualmente no formulário de criação do processo.

- Não pode ser nula.

## Veículo/Fornecedor:

- Inserida manualmente no formulário de criação do processo.

- Não pode ser nula.

## Período:

- Inserida manualmente no formulário de criação do processo.

- Não pode ser nula.

- Ao salvar no banco deve seguir um padrão específico, ou no formulário colocar dois campos, um para início e um para término.

- Discutir se envés de Período substituir por duas colunas, uma de início e outra de fim.

## Quantidade:

- Inserida manualmente no formulário de criação do processo.

- Não pode ser nula.

## $ Bruto:

- Inserida manualmente no formulário de criação do processo.

- Não pode ser nula.

## $ Líquido:

- Possui a seguinte fórmula, que envolve as colunas Tipo, Cliente, Meio, $ Bruto.


```excel
SEERRO(SE(Dados!$B13="Criação";"";(SE(Dados!$B13="Mídia";Dados!$O13*0,8;SE(E(Dados!$C13="ALEPI";Dados!$K13="Produção");Dados!$O13/1,07;SE(E(Dados!$C13="CCOM";Dados!$B13="Produção";Dados!$K13="Com Veiculação");Dados!$O13;Dados!$O13/1,1)))));"")
```

- Fórmula a ser usada para gerar o valor no banco:
```js
try {
    if (tipo == 'Criação') {
        liquido = null;
    } else {
        if(tipo == 'Mídia') {
            liquido = bruto * 0.8;
        } else {
            if(cliente == 'ALEPI' && meio == 'Produção') {
                liquido = bruto / 1.07;
            } else {
                if(cliente == 'CCOM' && tipo == 'Produção' && meio == 'Com Veiculação') {
                    liquido = bruto;
                } else {
                    liquido = bruto / 1.1;
                }
            }
        }
    }
} catch(error) {
    // equivalente ao SEERRO, só será chamado se o valor bruto for null, undefined ou uma string vazia
    liquido = null;
    console.error("Erro ao calcular líquido:", error);
}
```

- Não pode ser nula.

- Como depende de outras colunas, será preenchida automaticamente, sem a necessidade de estar no formulário de criação do processo.

## $ Agência:

- Possui a seguinte fórmula, envolvendo as colunas Tipo, Cliente, Meio, $Bruto e $Líquido:

```excel
SEERRO(SE(Dados!$B15="Criação";Dados!$O15;(SE(Dados!$B15="Mídia";Dados!$O15*0,2;SE(E(Dados!$C15="ALEPI";Dados!$K15="Produção");Dados!$P15*0,07;SE(E(Dados!$C15="CCOM";Dados!$B15="Produção";Dados!$K15="Com Veiculação");Dados!$O15*0;Dados!$P15*0,1)))));"")
```

- Fórmula a ser usada para gerar o valor no banco:

```js
try {
    if(tipo == 'Criação') {
        agencia = bruto;
    } else {
        if(tipo == 'Mídia') {
            agencia = bruto * 0.2;
        } else {
            if(cliente == 'ALEPI' && meio == 'Produção'){
                agencia == liquido * 0.07;
            } else {
                if(cliente == 'CCOM' && tipo == 'Produção' && meio == 'Com Veiculação') {
                    agencia = 0; // Decidir qual o melhor valor a colocar
                } else {
                    agencia = liquido * 0.1;
                }
            }
        }
    }
} catch(error) {
    // equivalente ao SEERRO, só será chamado se o valor bruto for null, undefined ou uma string vazia
    agencia = null;
    console.error("Erro ao calcular agencia:", error);
}
```

- Não pode ser nula.

- Como depende de outras colunas, será preenchida automaticamente, sem a necessidade de estar no formulário de criação do processo.

## $ Total:

- Possui a seguinte fórmula, envolvendo as colunas x, y:
```excel
SEERRO(SE(Dados!$B895="Criação";Dados!$O895;SOMA(Dados!$P895:$S895));"")
```

- Fórmula a ser usada para gerar o valor no banco:

```js
try {
    if(tipo == 'Criação'){
        total = bruto;
    } else {
        total = liquido + agencia;
    }
} catch(error) {
    // equivalente ao SEERRO, só será chamado se o valor bruto for null, undefined ou uma string vazia
    total = null;
    console.error("Erro ao calcular total:", error);
}
```

- Não pode ser nula.

- Como depende de outras colunas, será preenchida automaticamente, sem a necessidade de estar no formulário de criação do processo.

## Ano:

- Depende da coluna Período, porém discutir sobre o caso de o período iniciar em um ano e terminar em outro.

- Não pode ser nula.

- Discutir se deve ser inserida manualmente ou automaticamente baseada na coluna Período ou nas colunas Início e Fim citadas na descrição da coluna Período.

## Contrato: 

- Inserida manualmente no formulário de criação do processo.

- Não pode ser nula.

## Aditivo:

- Inserida manualmente no formulário de criação do processo.

- Não pode ser nula.

## Tipo de processo:

- Definir se os tipos só são os seguintes:

    - Apenas Fornecedor.
    - Apenas Soma.
    - Conjunto.
    - Fornecedor.
    - Próprio.

- Inserida no formulário, definir se manualmente ou com um campo de seleção contendo os valores acima.

- Não pode ser nula.

## Observação:

- Inserida manualmente no formulário de criação do processo.

- Definir se pode ser nula ou não.

# Colunas inseridas posteriormente no processo:

Estas colunas estarão presentes apenas no formulário de edição de processo.

## AR Cliente:

- Sem tipo definido.

- Definir como inserido.

## PI/Orça, AV/AP/AC, Prova:
- Possui a seguinte fórmula, envolvendo a coluna Situação:

```excel
SE(OU(AD255="Empenhado"; AD255="Pago"; AD255="Protocolado"); "ok"; "")
```
- Fórmula a ser usada para gerar o valor no banco:

```js
if(situacao == 'Empenhado' || situacao == 'Pago' || situacao == 'Protocolado') {
    pi_Orca = 'ok';
    av_ap_ac = 'ok';
    prova = 'ok';
}
```

- Possui 2 valores:

    - Vazio .
    - ok .

- Inserida automaticamente via regras de negócio da aplicação.

## Data Entrada na Ag.

- Inserida manualmente no formulário de edição do processo a partir de campo.

## Situação:

- Possui a seguinte fórmula envolvendo as colunas Meio, NFS-e Fornecedor, Empenhado, Processo e Entrada:

```excel
SE(K261="Com Veiculação"; ""; SE(NÃO(ÉCÉL.VAZIA(Dados!$AP261)); "Pago"; SE(NÃO(ÉCÉL.VAZIA(Dados!$AG261)); "Empenhado"; SE(E(NÃO(ÉCÉL.VAZIA(Dados!$AE261)); NÃO(ÉCÉL.VAZIA(Dados!$AF261))); "Protocolado"; "Aguardando"))))
```

- Fórmula a ser usada para gerar o valor no banco:

```js
if (meio == 'Com Veiculação'){
    situacao = '';
} else {
    if(nfse_forn != ''){
        situacao = 'Pago';
    } else if(empenhado != ''){
        situacao = 'Empenhado';
    } else if (processo != '' && entrada != ''){
        situacao = 'Protocolado';
    } else {
        situacao = 'Aguardando';
    }
}
```

- Inserida automaticamente a partir das regras de negócio da aplicação.

## Processo:

- Inserida manualmente no formulário de edição do processo a partir de campo.

## Entrada:

- Inserida manualmente no formulário de edição do processo a partir de campo.

## Empenhado:

- Inserida manualmente no formulário de edição do processo a partir de campo.

## Nº NFS-e ECL:

- Inserida manualmente no formulário de edição do processo a partir de campo.

## Data de NF ECL:

- Inserida manualmente no formulário de edição do processo a partir de campo.

## Valor dos Serviços ECL:

- Possui uma fórmula indicando que o valor dessa coluna é o mesmo valor da coluna $ Agência.

- Definir se deve ser inserido automaticamente com $ Agência, ou se a coluna pode ser removida.

## Valor Recebido Total:

- Possui a seguinte fórmula contendo as colunas Tipo de Processo, Valor dos Serviços ECL e $ Total:

```excel
SE(Dados!$X55="Próprio ";Dados!$AJ55;Dados!$T55)
```
- Fórmula a ser usada para gerar o valor no banco:

```js
if (tipo_processo == 'Próprio'){
    valor_recebido_total = valor_servicos_ecl;
} else {
    valor_recebido_total = total;
}
```

## Valor do Repasse:

- Possui uma fórmula indicando que o valor dessa coluna é o mesmo valor da coluna $ Líquido, porém alguns valores foram inseridos manualmente.

- Definir se deve ser inserido automaticamente com $ Líquido, ou se a coluna pode ser removida.

## IRRF -4,8% ECL:

- Possui a seguinte fórmula contendo a coluna Valor dos Serviços da ECL:

```excel
Dados!$AJ526*0,048
```

- Fórmula a ser usada para gerar o valor no banco:

```js
irrf_ecl = valor_servicos_ecl * 0.048;
```

## Valor Recebido Final:

- Possui a seguinte fórmula contendo a coluna Valor Recebido Total e IRRF -4,8% ECL:

```excel
Dados!$AK527-Dados!$AM527
```

- Fórmula a ser usada para gerar o valor no banco:

```js
valor_recebido_final = valor_recebido_total - irrf_ecl;
```
## Data do Recebimento:

- Inserido manualmente no formulário de edição de processo.

## NFS-e Fornecedor:

- Inserido manualmente no formulário de edição de processo.

# Resumo:

- As colunas abaixo terão campos obrigatórios(que devem ser preenchidos para o envio do formulário) no formulário de criação do processo:

    - Tipo
    - Cliente
    - Projeto
    - Doc
    - Campanha
    - Job/Peça
    - Autorizado
    - Responsável
    - Status
    - Meio
    - Veículo/Fornecedor
    - Período(Pode ser dividido em duas colunas Início e Fim)
    - Quantidade 
    - $ Bruto
    - Ano
    - Contrato
    - Aditivo
    - Tipo de Processo
    - Observação

- As colunas abaixo serão preenchidas automaticamente a partir dos dados inseridos no formulário de criação do processo:

    - Sit
    - $ Líquido
    - $ Agência
    - $ Total

- As colunas abaixo terão campos arbitrários(podem estar vazios no envio do formulário) no formulário de edição do processo:

    - AR Cliente
    - Data Entrada na AG.
    - Processo
    - Entrada
    - Empenhado
    - Nº NFS-e ECL
    - Data de NF ECL
    - Data do Recebimento
    - NFS-e Fornecedor

- As colunas abaixo serão preenchidas automaticamente a partir dos dados inseridos no formulário de edição do processo:

    - PI/Orça
    - AV/AP/AC
    - Prova
    - Situação
    - Valor dos Serviços ECL
    - Valor Recebido Total
    - Valor do Repasse
    - IRRF -4,8% ECL
    - Valor Recebido Final

## Relacionamentos entre Colunas

Algumas colunas não são independentes: seus valores dependem de outras colunas do formulário ou de cálculos definidos pelas regras de negócio. Esses relacionamentos devem ser respeitados para garantir integridade dos dados.

### 1. Dependências Diretas

- Sit:

    - Depende de: Tipo, Status e Processo.

    - Definida automaticamente de acordo com as condições estabelecidas.

- $ Líquido

    - Depende de: Tipo, Cliente, Meio, $ Bruto.

    - Usada como base para o cálculo de $ Agência.

- $ Agência

    - Depende de: Tipo, Cliente, Meio, $ Bruto e $ Líquido.

    - Em alguns casos, pode ser zero.

- $ Total

    - Depende de: $ Bruto, $ Líquido e $ Agência.

- Ano

    - Depende de: Período (ou Início e Fim se dividido).

- PI/Orça, AV/AP/AC, Prova

    - Dependem de: Situação.

- Situação

    - Depende de: Meio, NFS-e Fornecedor, Empenhado, Processo, Entrada.

- Valor dos Serviços ECL

    - Depende de: $ Agência.

- Valor Recebido Total

    - Depende de: Tipo de Processo, Valor dos Serviços ECL, $ Total.

- Valor do Repasse

    - Depende de: $ Líquido.

- IRRF -4,8% ECL

    - Depende de: Valor dos Serviços ECL.

- Valor Recebido Final

    - Depende de: Valor Recebido Total, IRRF -4,8% ECL.

### 2. Sequência Recomendada de Cálculo

- Para evitar inconsistências, a aplicação deve processar as colunas derivadas na seguinte ordem:

    - Calcular Sit.

    - Calcular $ Líquido a partir de $ Bruto.

    - Calcular $ Agência usando $ Bruto e $ Líquido.

    - Calcular $ Total.

    - Definir Ano a partir de Período (ou Início e Fim).

    - Calcular Situação.

    - Calcular PI/Orça, AV/AP/AC e Prova.

    - Calcular Valor dos Serviços ECL.

    - Calcular Valor Recebido Total.

    - Calcular Valor do Repasse.

    - Calcular IRRF -4,8% ECL.

    - Calcular Valor Recebido Final.
