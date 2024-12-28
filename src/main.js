function template(strings, ...keys) {
    return (...values) => {
        const dict = values[values.length - 1] || {};
        const result = [strings[0]];
        keys.forEach((key, i) => {
            const value = Number.isInteger(key) ? values[key] : dict[key];
            result.push(value, strings[i + 1]);
        });
        return result.join("");
    };
}

const E = (x) => document.getElementById(x);

let initialized = false;

function installDatePicker(hostElement) {
    hostElement.innerHTML = `<select class="form-select col" data-datepicker3-component="day">
        <option data-i18n-key="datepicker3.day">День</option>
        <option value="1">01</option>
        <option value="2">02</option>
        <option value="3">03</option>
        <option value="4">04</option>
        <option value="5">05</option>
        <option value="6">06</option>
        <option value="7">07</option>
        <option value="8">08</option>
        <option value="9">09</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
        <option value="13">13</option>
        <option value="14">14</option>
        <option value="15">15</option>
        <option value="16">16</option>
        <option value="17">17</option>
        <option value="18">18</option>
        <option value="19">19</option>
        <option value="21">21</option>
        <option value="22">22</option>
        <option value="23">23</option>
        <option value="24">24</option>
        <option value="25">25</option>
        <option value="26">26</option>
        <option value="27">27</option>
        <option value="28">28</option>
        <option value="29">29</option>
        <option value="30">30</option>
        <option value="31">31</option>
    </select>

    <select class="form-select col" data-datepicker3-component="month">
        <option data-i18n-key="datepicker3.month">Месяц</option>
        <option value="0">01</option>
        <option value="1">02</option>
        <option value="2">03</option>
        <option value="3">04</option>
        <option value="4">05</option>
        <option value="5">06</option>
        <option value="6">07</option>
        <option value="7">08</option>
        <option value="8">09</option>
        <option value="9">10</option>
        <option value="10">11</option>
        <option value="11">12</option>
    </select>

    <select class="form-select col" data-datepicker3-component="year">
        <option data-i18n-key="datepicker3.year">Год</option>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
        <option value="2025">2025</option>
        <option value="2026">2026</option>
        <option value="2027">2027</option>
        <option value="2028">2028</option>
    </select>`;
    hostElement.setAttribute("data-datepicker3-value", "");

    const update = (event) => {
        const d = new Date(hostElement.querySelector("[data-datepicker3-component=year]").value, 
                        hostElement.querySelector("[data-datepicker3-component=month]").value,
                        hostElement.querySelector("[data-datepicker3-component=day]").value);
        const newValue = dateFns.isValid(d) ? dateFns.formatISO(d) : "";
        if (newValue !== hostElement.getAttribute("data-datepicker3-value")) {
            hostElement.setAttribute("data-datepicker3-value", newValue);
            hostElement.dispatchEvent(new Event("change"));
        }
        event.stopPropagation();
    };
    hostElement.querySelector("[data-datepicker3-component=day]").addEventListener("change", update)
    hostElement.querySelector("[data-datepicker3-component=month]").addEventListener("change", update)
    hostElement.querySelector("[data-datepicker3-component=year]").addEventListener("change", update)
}

document.addEventListener('DOMContentLoaded', () => {
    for (const el of document.querySelectorAll(".datepicker3")) {
        installDatePicker(el);
    }

    for (const el of document.querySelectorAll("[data-update-event]")) {
        el.addEventListener(el.getAttribute("data-update-event"), update);
    }

    for (const el of document.querySelectorAll("[data-switch-lang]")) {
        el.addEventListener("click", () => switchLanguage(el.getAttribute("data-switch-lang")));
    }

    for (const el of document.querySelectorAll("[data-citizen-options-event]")) {
        el.addEventListener(el.getAttribute("data-citizen-options-event"), showOtherCitizenOptions);
    }

});

document.addEventListener("DOMContentLoaded", () => {
    i18next.init({
        lng: 'ru',
        debug: false,
        resources: {
            ru: {
                translation: {
                    "app-heading": "Информация об автоматическом продлении ВНЖ по §&nbsp;24",
                    "disclaimer": "Информация на этой странице собрана волонтёрами. Мы не гарантируем её верность. Всю ответственность за все действия, связанные с вашими документами, несёте вы.",

                    permit: {
                        paragraphHeading: "Параграф вашего ВНЖ:",
                        paragraph24: "§ 24",
                        paragraphOther: "другой",
                        paragraphWhere: "Параграф указан в виде нескольких цифр в поле <strong>Anmerkungen</strong>.",
                        issueDate: "Дата выдачи ВНЖ:",
                        issueDateWhere: "Дата выдачи указана на обратной стороне карты в поле <strong>Ausstellungsdatum</strong>.",
                        expiryDate: "Срок действия ВНЖ:",
                        expiryDateWhere: "Срок действия указан на лицевой стороне карты в поле <strong>Karte gültig bis</strong>.",
                    },

                    citizenship: {
                        heading: "Ваше гражданство:",
                        ukraine: "Украина",
                        other:   "другое",
                        otherOptionsHeading: "У граждан других стран для автопродления должны выполняться дополнительные условия:",
                        otherOptionsRelatives: "У меня есть супруг(а) или несовершеннолетние дети, которые являются гражданами Украины, получили временную защиту в Германии и живут вместе со мной",
                        otherOptionsResidence: "По состоянию на 24.02.2022 я постоянно проживал(а) в Украине на основании бессрочного ВНЖ (ПМЖ)",
                    },

                    result: {
                        insufficientData: "Введено недостаточно информации.",
                        otherCitizenExpiring: ("Ваш ВНЖ не попадает под автоматическое продление, так как вы не входите в список категорий граждан третьих стран, претендующих на временную защиту. " +
                                              "<strong>Ваше правo пребывания в Германии заканчивается 04.03.2025.</strong>"),
                        magicExtension: "Ваш ВНЖ попадает под автоматическое продление до 04.03.2026. " +
                                    "Для ведомств и работодателей вы можете воспользоваться текстом письма, указанным ниже.",
                        notEligibleParagraph: "Ваш ВНЖ не попадает под автоматическое продление, так как выдан по другому параграфу. " +
                            "Вам необходимо подать заявление о продлении ВНЖ в вашу миграционную службу до окончания срока его действия. " +
                            "Вы можете воспользоваться образцом заявления, указанным ниже, подставив туда параграф по которому выдан ваш ВНЖ.",
                        notEligibleByDate: "Ваш ВНЖ не попадает под автоматическое продление, так как не действителен ни по состоянию на 01.02.2024, ни по состоянию на 01.02.2025. " +
                                           '<strong>Срок его действия истечёт {{expiryDate)}. ' +
                                           "Вам необходимо вовремя подать заявление о продлении ВНЖ в вашу миграционную службу. " +
                                           "Вы можете воспользоваться образцом заявления, указанным нижe.",
                        sufficientValidity: ("Ваш ВНЖ действителен до {{expiryDate}}. " +
                            "По состоянию на {{today}} этот срок совпадает c максимально возможным сроком действия ВНЖ по § 24 AufenthG, или превышает его." +
                            "У вас нет необходимости в автопродлении.") 
                    },

                    letter: {
                        heading: "Текст письма:",
                        attachmentHeading: "Приложите к письму следующие документы:",
                        mailInfo: "UAhelp Wiki: Как правильно оформить и отправить бумажное письмо",
                        copyButton: "Копировать",

                        templateOtherParagraph: template`Sehr geehrte Damen und Herren,

hiermit beantrage ich die Verlängerung meiner Aufenthaltserlaubnis (Kopie liegt bei).

Die Aufenthaltserlaubnis ist nach § <ПАРАГРАФ, НАПРИМЕР 33> AufenthG und nicht nach § 24 AufenthG ausgestellt. Damit fällt diese Aufenthaltserlaubnis nicht in den Geltungsbereich der Verordnung des Bundesinnenministeriums vom 28.11.2024 zur automatischen Verlängerung von Aufenthaltserlaubnissen für ukrainische Geflüchtete. Diese Verordnung gilt ausschließlich für Aufenthaltstitel nach § 24 AufenthG. Alle anderen Aufenthaltserlaubnisse sind regulär zu verlängern. 

Ich bitte Sie daher, die Aufenthaltserlaubnis zu verlängern und einen neuen elektronischen Aufenthaltstitel auszustellen. Weiterhin bitte ich Sie, eine Fiktionsbescheinigung nach § 81 Abs. 4 AufenthG auszustellen, die den Eingang dieses Antrags bestätigt.
Sollte eine persönliche Vorsprache erforderlich sein, bitte ich Sie, mir den entsprechenden Termin und Ort mitzuteilen. 

Mit freundlichen Grüßen 
`
                    },

                    attachment: {
                        fgv1: "Первый раунд (2024-2025): Изначальная редакция постановления об автопродлении",
                        fgv2: "Второй раунд (2025-2026): Постановление о продлении автопродления",
                        fgvConsolidated: "Второй раунд (2025-2026): Обновленная редакция постановления об автопродлении (PDF)",
                        permit: "Копию вашего ВНЖ",
                    },
                    
                    datepicker3: {
                        day: "День",
                        month: "Месяц",
                        year: "Год",
                    },

                }
            },
            de: {
                translation: {
                    "app-heading": "Informationen zur automatischen Verlängerung von Aufenthaltstiteln nach §&nbsp;24 AufenthG",
                    "disclaimer": "Diese Informationen wurden von ehrenamtlichen Helfern nach bestem Wissen und Gewissen zusammengetragen. Alle Angaben ohne Gewähr.",
                    permit: {
                        paragraphHeading: "eAT-Grundlage",
                        paragraph24: "§ 24",
                        paragraphOther: "andere",
                        paragraphWhere: "Die Grundlage (Paragraphnummer im AufenthG) ist als Zahl oder Text im Feld <strong>\"Anmerkungen\"</strong> angegeben.",
                        issueDate: "ausgestellt am",
                        issueDateWhere: "Das Ausstellungsdatum ist auf der Rückseite der Karte im Feld \"<strong>Ausstellungsdatum</strong>\" angegeben.",
                        expiryDate: "gültig bis:",
                        expiryDateWhere: "Der letzte Tag der Gültigkeit des Aufenthaltstitels ist auf der Vorderseite im Feld <strong>\"Karte gültig bis\"</strong> angegeben.",
                    },
                    citizenship: {
                        heading: "Staats&shy;angehörigkeit:",
                        ukraine: "Ukraine",
                        other:   "andere",
                        otherOptionsHeading: "Für Staatsangehörige anderer Drittstaaten als der Ukraine müssen weitere Bedingungen erfüllt sein:",
                        otherOptionsRelatives: "Mein(e) Ehepartner(in) oder meine minderjährigen Kinder sind ukrainische Staatsangehörige, erhielten vorübergehenden Schutz in Deutschland und leben mit mir zusammen",
                        otherOptionsResidence: "Am 24.02.2022 habe ich mich auf Grund eines unbefristeten ukrainischen Aufenthaltstitels dauerhaft in der Ukraine aufgehalten",
                    },
                    result: {
                        insufficientData: "Es wurden noch nicht genug Daten für eine Bewertung eingegeben.",
                        otherCitizenExpiring: "Ihr Aufenthaltstitel ist von der automatischen Verlängerung nicht erfasst. Sie gehören keiner Kategorie der Drittstaatsangehörigen an, für die eine automatische Verlängerung vorgesehen ist. <strong>Ihr Aufenthaltsrecht in Deutschland auf Grund dieses Aufenthaltstitels endet am 04.03.2025.</strong>",
                        magicExtension: "Ihr Aufenthaltstitel gilt automatisch bis zum 04.03.2026 fort. " +
                                    "Für Behörden und Arbeitgeber können Sie den folgenden Musterbrief verwenden, der die Grundlage der Fortgeltung erklärt.",
                        notEligibleParagraph: "Ihr Aufenthaltstitel ist von der automatischen Fortgeltung nicht erfasst, da er nicht nach §&nbsp;24 AufenthG ausgestellt wurde. " +
                            "Sie müssen rechtzeitig vor Ablauf einen Antrag auf Verlängerung bei der zuständigen Ausländerbehörde stelle. " +
                            "Sie können den unten angegebenen Musterbrief verwenden. Ersetzen sie den Platzhalter durch die Angabe des Paragraphen Ihres Aufenthaltitels.",
                        notEligibleByDate: "Ihr Aufenthaltstitel ist von der automatischen Verlängerung nicht erfasst, da er weder am 01.02.2024 noch am 01.02.2025 gilt. " +
                                           '<strong>Seine Gültigkeit läuft am {{expiryDate}} ab.</strong> ' +
                                           "Sie müssen rechtzeitig vor Ablauf einen Antrag auf Verlängerung stellen. " +
                                           "Sie können dafür den unten angezeigten Musterantrag verwenden.",

                        sufficientValidity: ("Ihr Aufenthaltstitel ist bis {{expiryDate}} gültig. " +
                            "Mit Stand zum {{today}} ist dies die maximale Gültigkeitsdauer eines Aufenthaltstitels nach § 24 AufenthG. Ihr Aufenthaltstitel benötigt keine Sonderregelungen.")
                    },

                    letter: {
                        heading: "Musterbrief:",
                        attachmentHeading: "Legen Sie Ihrem Brief folgende Dokumente bei:",
                        copyButton: "Kopieren",
                        mailInfo: "UAhelp Wiki: Anleitung zum Versenden von Briefen (russisch)",

                        templateOtherParagraph: template`Sehr geehrte Damen und Herren,

hiermit beantrage ich die Verlängerung meiner Aufenthaltserlaubnis (Kopie liegt bei).

Die Aufenthaltserlaubnis ist nach § <PARAGRAPH DES AT, z.B. 33> AufenthG und nicht nach § 24 AufenthG ausgestellt. Damit fällt diese Aufenthaltserlaubnis nicht in den Geltungsbereich der Verordnung des Bundesinnenministeriums vom 28.11.2024 zur automatischen Verlängerung von Aufenthaltserlaubnissen für ukrainische Geflüchtete. Diese Verordnung gilt ausschließlich für Aufenthaltstitel nach § 24 AufenthG. Alle anderen Aufenthaltserlaubnisse sind regulär zu verlängern. 

Ich bitte Sie daher, die Aufenthaltserlaubnis zu verlängern und einen neuen elektronischen Aufenthaltstitel auszustellen. Weiterhin bitte ich Sie, eine Fiktionsbescheinigung nach § 81 Abs. 4 AufenthG auszustellen, die den Eingang dieses Antrags bestätigt.
Sollte eine persönliche Vorsprache erforderlich sein, bitte ich Sie, mir den entsprechenden Termin und Ort mitzuteilen. 

Mit freundlichen Grüßen 
`
                    },

                    attachment: {
                        fgv1: "Erste Runde (2024-2025): Erste Fassung der Ukraine-Aufenthaltstitel-Fortgeltungsverordnung",
                        fgv2: "Zweite Runde (2025-2026): 1. Änderungsverordnung zur Ukraine-Aufenthaltstitel-Fortgeltungsverordnung",
                        fgvConsolidated: "Zweite Runde (2025-2026): Neue Fassung der Ukraine-Aufenthaltstitel-Fortgeltungsverordnung",
                        permit: "Kopie Ihres Aufenthaltstitels",
                    },

                    datepicker3: {
                        day: "Tag",
                        month: "Monat",
                        year: "Jahr",
                    },
                }
            }
        }
    }).then((t) => {
        const _params = Object.fromEntries(new URL(window.location.href).hash.replace("#", "").split("/").map((x) => x.split('=', 2)));
        if (_params.lang == 'de' || _params.lang == 'ru') {
            i18next.changeLanguage(_params.lang);
        }
        updateLanguage();
    })
});

function updateLanguage() {
    for (const el of document.querySelectorAll("[data-i18n-key]")) {
        el.innerHTML = i18next.t(el.getAttribute("data-i18n-key"));
    }
}

function switchLanguage(lang) {
    i18next.changeLanguage(lang);
    for (const b of E("langList").querySelectorAll("li button")) {
        b.classList.remove("active");
        if (b.getAttribute("data-value") == lang) {
            b.classList.add("active");
        }
    }
    updateLanguage();
    update();
}

document.addEventListener('DOMContentLoaded', () => {
    const _params = Object.fromEntries(new URL(window.location.href).hash.replace("#", "").split("/").map((x) => x.split('=', 2)));
    
    if (_params.p == "24") {
        E("permitParagraph24").checked = true;
    } else if (_params.p != undefined && _params.p != "") {
        E("permitParagraphOther").checked = true;
    }

    if (_params.c == "ua") {
        E("citizenshipUkraine").checked = true;
    } else if (_params.c == "other") {
        E("citizenshipOther").checked = true;
        E("haveRelatives").checked = _params.rel == "1";
        E("haveResidence").checked = _params.res == "1";
    }

    showOtherCitizenOptions();

    const updateDatePicker = (elem, dateString) => {
        if (dateString == undefined || dateString == null) {
            return;
        }

        let d = dateFns.parse(dateString, "dd.MM.yyyy", new Date());
        if (!dateFns.isValid(d)) {
            return;
        }
        elem.querySelector("[data-datepicker3-component=day]").value = d.getDate();
        elem.querySelector("[data-datepicker3-component=month]").value = d.getMonth();
        elem.querySelector("[data-datepicker3-component=year]").value = d.getFullYear();
        elem.setAttribute("data-datepicker3-value",  dateFns.formatISO(d));
    }

    updateDatePicker(E("issueDate"), _params.i);
    updateDatePicker(E("expiryDate"), _params.e);

    initialized = true;
    update();
});

function showOtherCitizenOptions() {
    let opts = new bootstrap.Collapse("#otherCitizenOptions", {toggle: false});
    if (E("citizenshipOther").checked) {
        opts.show();
    } else {
        opts.hide();
    }
}

E("copyLetterButton").addEventListener("click", (event) => {
    if (E("letter").innerHTML != "") {
        navigator.clipboard.writeText(E("letter").innerHTML).then(() => {
            const saved = event.target.innerHTML;
            event.target.innerHTML = '<i class="bi bi-check-circle-fill"></i> Скопировано';
            setTimeout(() => {
                event.target.innerHTML = saved;
            }, 3000)
        });
    }
});

const templateDouble = template`Sehr geehrte Damen und Herren,

das Bundesministerium des Innern und für Heimat hat am 28.11.2024 eine Verordnung erlassen, die die weitere automatische Fortgeltung der Aufenthaltstitel nach § 24 AufenthG regelt. 

Mein Aufenthaltstitel ist nach § 24 AufenthG ausgestellt, fällt unter diese Regelung und ist bis zum 04.03.2026 gültig. Dies ist folgendermaßen begründet:

1. Mein Aufenthaltstitel wurde am ${"issueDate"} ausgestellt und hat ein aufgedrucktes Gültigkeitsdatum von ${"expiryDate"}. 
2. Der Aufenthaltstitel war somit am 01.02.2024 gültig. Er fällt somit grundsätzlich unter die Ukraine-Aufenthaltserlaubnis-Fortgeltungsverordnung in der Fassung vom 28.11.2023 (BGBl. 2023 I 334, https://www.recht.bund.de/bgbl/1/2023/334/VO.html). Seine Gültigkeit wurde dadurch bis zum 04.03.2025 verlängert, ungeachtet des aufgedruckten Gültigkeitsdatums. Dadurch ist mein Aufenthaltstitel insbesondere auch als "am 01.02.2025 gültig" anzusehen.
3. Dadurch, dass mein Aufenthaltstitel zum Stichtag 01.02.2025 gültig war bzw. ist, fällt er grundsätzlich unter die UkraineAufenthFGV in der ab 28.11.2024 geltenden Fassung. Die konsolidierte Fassung ist unter https://www.gesetze-im-internet.de/ukraineaufenthfgv/BJNR14E0A0023.html abrufbar, die dazugehörige Änderungsverordnung unter BGBl. 2024 I 363, https://www.recht.bund.de/bgbl/1/2024/363/VO.html.
4. ${"citizenshipSentence"} Damit gehöre ich zu dem Personenkreis, für den nach der UkraineAufenthFGV in der Fassung vom 28.11.2024 eine weitere automatische Verlängerung des Gültigkeitsdauer des Aufenthaltstitels vorgesehen ist.
5. Damit gilt mein Aufenthaltstitel bis zum Ablauf des 04.03.2026 fort, ohne Verlängerung im Einzelfall und ungeachtet des aufgedruckten Ablaufdatums.

Mit freundlichen Grüßen`;

const templateSingle = template`Sehr geehrte Damen und Herren,

das Bundesministerium des Innern und für Heimat hat am 28.11.2024 eine Verordnung erlassen, die die automatische Fortgeltung der Aufenthaltstitel nach § 24 AufenthG regelt. 

Mein Aufenthaltstitel ist nach § 24 AufenthG ausgestellt, fällt unter diese Regelung und ist bis zum 04.03.2026 gültig. Dies ist folgendermaßen begründet:

1. Mein Aufenthaltstitel wurde am ${"issueDate"} ausgestellt und hat ein aufgedrucktes Gültigkeitsdatum von ${"expiryDate"}. 
2. Der Aufenthaltstitel ist somit am 01.02.2025 gültig. Er fällt somit grundsätzlich unter die Ukraine-Aufenthaltserlaubnis-Fortgeltungsverordnung in der Fassung vom 28.11.2024. Die konsolidierte Fassung ist unter https://www.gesetze-im-internet.de/ukraineaufenthfgv/BJNR14E0A0023.html abrufbar, die dazugehörige Änderungsverordnung unter BGBl. 2024 I 363, https://www.recht.bund.de/bgbl/1/2024/363/VO.html.
3. ${"citizenshipSentence"} Damit gehöre ich zu dem Personenkreis, für den eine weitere automatische Verlängerung des Gültigkeitsdauer des Aufenthaltstitels vorgesehen ist.
4. Damit gilt mein Aufenthaltstitel bis zum Ablauf des 04.03.2026 fort, ohne Verlängerung im Einzelfall und ungeachtet des aufgedruckten Ablaufdatums.

Mit freundlichen Grüßen`;

const templateOtherDates = template`Sehr geehrte Damen und Herren,

hiermit beantrage ich die Verlängerung meiner Aufenthaltserlaubnis (Kopie liegt bei).

Die Aufenthaltserlaubnis ist zwar nach § 24 AufenthG ausgestellt. Sie ist jedoch nur von ${"issueDate"} bis ${"expiryDate"} und somit weder am 01.02.2024 noch am 01.02.2025 gültig.
Damit ist sie nicht von der automatischen Verlängerung durch die UkraineAufenthFGV erfasst. Alle Aufenthaltserlaubnisse, die davon nicht erfasst sind, sind regulär zu verlängern.

Ich bitte Sie daher, die Aufenthaltserlaubnis zu verlängern und einen neuen elektronischen Aufenthaltstitel auszustellen. Weiterhin bitte ich Sie, eine Fiktionsbescheinigung nach § 81 Abs. 4 AufenthG auszustellen, die den Eingang dieses Antrags bestätigt.
Sollte eine persönliche Vorsprache erforderlich sein, bitte ich Sie, mir den entsprechenden Termin und Ort mitzuteilen. 

Mit freundlichen Grüßen 
`;

const DOCS = {
    FGV1: { link: "https://www.recht.bund.de/bgbl/1/2023/334/VO.html", key: "attachment.fgv1" },
    FGV2: { link: "https://www.recht.bund.de/bgbl/1/2024/363/VO.html", key: "attachment.fgv2"},
    FGVС: { link: "https://www.gesetze-im-internet.de/ukraineaufenthfgv/UkraineAufenthFGV.pdf", key: "attachment.fgvConsolidated"},
    PERMIT: { link: null, key: 'attachment.permit' },
}

function createLetter24(issueDate, expiryDate) {
    let citizenshipSentence = "";

    if (E("citizenshipUkraine").checked) {
        citizenshipSentence = "Ich besitze die ukrainische Staatsangehörigkeit.";
    } else if (E("citizenshipOther").checked) {
        if (E("haveRelatives").checked) {
            citizenshipSentence = "Ich gehöre der Familie eines ukrainischen Staatsangehörigen an, der in Deutschland eine Aufenthalterlaubnis nach § 24 AufenthG erhalten hat."
        } else if (E("haveResidence").checked) {
            citizenshipSentence = "Ich habe mich am 24.02.2022 auf Grund eines unbefristeten ukrainischen Aufenthaltstitels in der Ukraine aufgehalten."
        } 
    }

    let letter = "ERROR";
    let docList = [];

    const params = {
                issueDate: dateFns.format(issueDate, "dd.MM.yyyy"), 
                expiryDate: dateFns.format(expiryDate, "dd.MM.yyyy"),
                citizenshipSentence: citizenshipSentence,
            };

    if (isEligibleByDateSingle(issueDate, expiryDate)) {
        letter = templateSingle(params)
        docList = [DOCS.FGVС]
    } else if (isEligibleByDateDouble(issueDate, expiryDate)) {
        letter = templateDouble(params)
        docList = [DOCS.FGV1, DOCS.FGV2, DOCS.FGVС]
    } else {
        letter = templateOtherDates(params)
        docList = [DOCS.PERMIT]
    }

    document.getElementById("letter").innerHTML = letter;
    E("copyLetterButton").classList.remove("disabled");

    updateDocList(docList);
    new bootstrap.Collapse("#docList", {toggle: false}).show();
    new bootstrap.Collapse("#letterContainer", {toggle: false}).show();
}

function updateDocList(docs) {
    E("docList").querySelector("ul").innerHTML = docs.map((d) => {
        if (d.link == null) {
            return `<li class="ms-3">${i18next.t(d.key)}</li>`
        } else {
            return `<li class="ms-3"><a href="${d.link})" target="_blank">${i18next.t(d.key)}</a></li>`
        }
    }).join("\n");
}

function createLetterOther() {
    document.getElementById("letter").innerHTML = i18next.t("letter.templateOtherParagraph")();
    let docList = [DOCS.PERMIT];

    E("copyLetterButton").classList.remove("disabled");
    updateDocList(docList);

    new bootstrap.Collapse("#docList", {toggle: false}).show();
    new bootstrap.Collapse("#letterContainer", {toggle: false}).show();
}

function clearLetter() {
    document.getElementById("letter").innerHTML = "";
    E("copyLetterButton").classList.add("disabled");
    E("docList").querySelector("ul").innerHTML = "";
    new bootstrap.Collapse("#docList", {toggle: false}).hide();
    new bootstrap.Collapse("#letterContainer", {toggle: false}).hide();
}

function updateAlert(alertInfo) {
    const wrapper = E("alertPlaceholder");
    wrapper.innerHTML = [
        `<div class="alert alert-${alertInfo.type}" role="alert">`,
        `<i class="bi bi-${alertInfo.iconType}-fill me-2"></i>`,
        alertInfo.message,
        '</div>',
    ].join('')
}

const fgv1pivot = new Date(2024, 1, 1);
const fgv2pivot = new Date(2025, 1, 1);

// Be careful: issue and expiry dates of German permits are inclusive.

function isEligibleByDateSingle(issueDate, expiryDate) {
    return (dateFns.isAfter(dateFns.add(expiryDate, {days: 1}), fgv2pivot)
         && dateFns.isBefore(dateFns.sub(issueDate, {days: 1}), fgv2pivot))
}

function isEligibleByDateDouble(issueDate, expiryDate) {
    return (dateFns.isAfter(dateFns.add(expiryDate, {days: 1}), fgv1pivot)
         && dateFns.isBefore(dateFns.sub(issueDate, {days: 1}), fgv1pivot))
}

function isEligibleByDate(issueDate, expiryDate) {
    return isEligibleByDateSingle(issueDate, expiryDate) || isEligibleByDateDouble(issueDate, expiryDate);
}

function updateByDate(issueDate, expiryDate) {
    if (isEligibleByDate(issueDate, expiryDate)) {
        updateAlert({
            type: 'success',
            iconType: 'check-circle',
            message: i18next.t("result.magicExtension"),
        });                        
    } else {
        updateAlert({
            type: 'warning',
            iconType: 'exclamation-triangle',
            message: i18next.t("result.notEligibleByDate", { expiryDate: dateFns.format(expiryDate, "dd.MM.yyyy") }),
        });                                     
    }
    createLetter24(issueDate, expiryDate);
}

function update() {
    if (!initialized) {
        return;
    }

    const _params = {}; 
    const core = () => {
        const issueDate = dateFns.parseISO(E("issueDate").getAttribute("data-datepicker3-value"));
        const expiryDate = dateFns.parseISO(E("expiryDate").getAttribute("data-datepicker3-value"));

        _params.i = isNaN(issueDate) ? "" : dateFns.format(issueDate, "dd.MM.yyyy");
        _params.e = isNaN(expiryDate) ? "" : dateFns.format(expiryDate, "dd.MM.yyyy");

        if (E("permitParagraphOther").checked) {
            updateAlert({
                type: 'warning',
                iconType: 'exclamation-triangle',
                message: i18next.t("result.notEligibleParagraph"),
            });
            _params.p = 'other';
            createLetterOther();
            return;
        }

        if (!isNaN(expiryDate) && dateFns.isAfter(expiryDate, new Date(2026, 2, 3))) {
            updateAlert({
                type: 'success',
                iconType: 'check-circle',
                message: i18next.t("result.sufficientValidity", {
                    expiryDate: dateFns.format(expiryDate, "dd.MM.yyyy"),
                    today: dateFns.format(new Date(), "dd.MM.yyyy")}),
            });
            clearLetter();
            return;
        }

        if (E("permitParagraph24").checked) {
            _params.p = '24';
            if (E("citizenshipUkraine").checked) {
                _params.c = 'ua';
                if (!isNaN(issueDate) && !isNaN(expiryDate)) {
                    updateByDate(issueDate, expiryDate);
                    return;
                }
            }

            if (E("citizenshipOther").checked) {
                _params.c = 'other';
                _params.rel = E("haveRelatives").checked ? "1" : "";
                _params.res = E("haveResidence").checked ? "1" : "";
                if (E("haveRelatives").checked || E("haveResidence").checked) {
                    if (!isNaN(issueDate) && !isNaN(expiryDate)) {
                        updateByDate(issueDate, expiryDate);
                        return;
                    }
                } else {
                    updateAlert({
                        type: 'danger',
                        iconType: 'exclamation-triangle',
                        message: i18next.t("result.otherCitizenExpiring"),
                    });
                    clearLetter();
                    return;
                }
            }
        }

        updateAlert({
                type: 'info',
                iconType: 'question-circle',
                message: i18next.t("result.insufficientData"),
        });
        clearLetter();
    }
    core();

    _params.lang = i18next.language;
    const url = new URL(window.location.href);
    const keys = Object.keys(_params).sort();
    url.hash = keys.map((x) => `${x}=${_params[x]}`).join("/");
    history.replaceState(null, "", url);

}
