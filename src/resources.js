import { template } from "./utils";

export const templateDouble = template`Sehr geehrte Damen und Herren,

das Bundesministerium des Innern und für Heimat hat am 28.11.2024 eine Verordnung erlassen, die die weitere automatische Fortgeltung der Aufenthaltstitel nach § 24 AufenthG regelt. 

Mein Aufenthaltstitel ist nach § 24 AufenthG ausgestellt, fällt unter diese Regelung und ist bis zum 04.03.2026 gültig. Dies ist folgendermaßen begründet:

1. Mein Aufenthaltstitel wurde am ${"issueDate"} ausgestellt und hat ein aufgedrucktes Gültigkeitsdatum von ${"expiryDate"}. 
2. Der Aufenthaltstitel war somit am 01.02.2024 gültig. Er fällt somit grundsätzlich unter die Ukraine-Aufenthaltserlaubnis-Fortgeltungsverordnung in der Fassung vom 28.11.2023 (BGBl. 2023 I 334, https://www.recht.bund.de/bgbl/1/2023/334/VO.html). Seine Gültigkeit wurde dadurch bis zum 04.03.2025 verlängert, ungeachtet des aufgedruckten Gültigkeitsdatums. Dadurch ist mein Aufenthaltstitel insbesondere auch als "am 01.02.2025 gültig" anzusehen.
3. Dadurch, dass mein Aufenthaltstitel zum Stichtag 01.02.2025 gültig war bzw. ist, fällt er grundsätzlich unter die UkraineAufenthFGV in der ab 28.11.2024 geltenden Fassung. Die konsolidierte Fassung ist unter https://www.gesetze-im-internet.de/ukraineaufenthfgv/BJNR14E0A0023.html abrufbar, die dazugehörige Änderungsverordnung unter BGBl. 2024 I 363, https://www.recht.bund.de/bgbl/1/2024/363/VO.html.
4. ${"citizenshipSentence"} Damit gehöre ich zu dem Personenkreis, für den nach der UkraineAufenthFGV in der Fassung vom 28.11.2024 eine weitere automatische Verlängerung des Gültigkeitsdauer des Aufenthaltstitels vorgesehen ist.
5. Damit gilt mein Aufenthaltstitel bis zum Ablauf des 04.03.2026 fort, ohne Verlängerung im Einzelfall und ungeachtet des aufgedruckten Ablaufdatums.

Mit freundlichen Grüßen`;

export const templateSingle = template`Sehr geehrte Damen und Herren,

das Bundesministerium des Innern und für Heimat hat am 28.11.2024 eine Verordnung erlassen, die die automatische Fortgeltung der Aufenthaltstitel nach § 24 AufenthG regelt. 

Mein Aufenthaltstitel ist nach § 24 AufenthG ausgestellt, fällt unter diese Regelung und ist bis zum 04.03.2026 gültig. Dies ist folgendermaßen begründet:

1. Mein Aufenthaltstitel wurde am ${"issueDate"} ausgestellt und hat ein aufgedrucktes Gültigkeitsdatum von ${"expiryDate"}. 
2. Der Aufenthaltstitel ist somit am 01.02.2025 gültig. Er fällt somit grundsätzlich unter die Ukraine-Aufenthaltserlaubnis-Fortgeltungsverordnung in der Fassung vom 28.11.2024. Die konsolidierte Fassung ist unter https://www.gesetze-im-internet.de/ukraineaufenthfgv/BJNR14E0A0023.html abrufbar, die dazugehörige Änderungsverordnung unter BGBl. 2024 I 363, https://www.recht.bund.de/bgbl/1/2024/363/VO.html.
3. ${"citizenshipSentence"} Damit gehöre ich zu dem Personenkreis, für den eine weitere automatische Verlängerung des Gültigkeitsdauer des Aufenthaltstitels vorgesehen ist.
4. Damit gilt mein Aufenthaltstitel bis zum Ablauf des 04.03.2026 fort, ohne Verlängerung im Einzelfall und ungeachtet des aufgedruckten Ablaufdatums.

Mit freundlichen Grüßen`;

export const templateOtherDates = template`Sehr geehrte Damen und Herren,

hiermit beantrage ich die Verlängerung meiner Aufenthaltserlaubnis (Kopie liegt bei).

Die Aufenthaltserlaubnis ist zwar nach § 24 AufenthG ausgestellt. Sie ist jedoch nur von ${"issueDate"} bis ${"expiryDate"} und somit weder am 01.02.2024 noch am 01.02.2025 gültig.
Damit ist sie nicht von der automatischen Verlängerung durch die UkraineAufenthFGV erfasst. Alle Aufenthaltserlaubnisse, die davon nicht erfasst sind, sind regulär zu verlängern.

Ich bitte Sie daher, die Aufenthaltserlaubnis zu verlängern und einen neuen elektronischen Aufenthaltstitel auszustellen. Weiterhin bitte ich Sie, eine Fiktionsbescheinigung nach § 81 Abs. 4 AufenthG auszustellen, die den Eingang dieses Antrags bestätigt.
Sollte eine persönliche Vorsprache erforderlich sein, bitte ich Sie, mir den entsprechenden Termin und Ort mitzuteilen. 

Mit freundlichen Grüßen 
`;

export const strings_ru = {
    translation: {
        "app-heading": "Информация об автоматическом продлении ВНЖ по §&nbsp;24",
        "app-aboutHeading": "О WOLJA и UAhelp",
        "app-about": 
            `<p><a href="https://wolja-stuttgart.de">WOLJA e.V. - благотворительная общественная организация в Штутгарте.</a> WOLJA занимается различными видами помощи новоприбывшим - от сопровождения непосредственно после эвакуации до помощи в повседневной жизни на более поздних стадиях интеграции.</p>
             <p>UAhelp - проект <a href="https://digitalvolunteers.de/">общественной организации Digitalista e.V.</a> по сбору и предоставлению информации для тех, кто прибыл в Германию вследствие вторжения РФ в Украину. Центральные площадки проекта - это <a href="https://uahelp.wiki">сайт UAhelp.Wiki</a>, <a href="https://www.youtube.com/@UAhelp">канал на Youtube</a> и <a href="https://www.tiktok.com/@uahelp_germany">канал в Тiktok</a>. </p>`,
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
                               '<strong>Срок его действия истечёт {{expiryDate}}.<strong> ' +
                               "Вам необходимо вовремя подать заявление о продлении ВНЖ в вашу миграционную службу. " +
                               "Вы можете воспользоваться образцом заявления, указанным нижe.",
            sufficientValidity: ("Ваш ВНЖ действителен до {{expiryDate}}. " +
                "По состоянию на {{today}} этот срок совпадает c максимально возможным сроком действия ВНЖ по § 24 AufenthG, или превышает его. " +
                "У вас нет необходимости в автопродлении."),
            issueAfterExpiry: "Срок действия ВНЖ не может заканчиваться ранее даты его выдачи. Проверьте верность данных.",
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
}

export const strings_de = {
    translation: {
        "app-heading": "Informationen zur automatischen Verlängerung von Aufenthaltstiteln nach §&nbsp;24 AufenthG",
        "app-aboutHeading": "Über WOLJA und UAhelp",
        "app-about": 
            `<p><a href="https://wolja-stuttgart.de">WOLJA e.V. ist ein gemeinnütziger und mildtätiger Verein in Stuttgart.</a> WOLJA leistet auf vielfältige Weise Hilfe für die Neuankommenden - von der Begleitung bei unmittelbar nach der Evakuierung bis zu Hilfen im Alltag in den späteren Phasen der Integration.</p>
             <p>UAhelp ist ein Projekt von <a href="https://digitalvolunteers.de/">Digitalista e.V.</a> Es befasst sich mit der Sammlung und Bereitstellung von Informationen für die Menschen die in Folge der russischen Invasion in die Ukraine nach Deutschland gekommen sind. Das Projekt umfasst unter anderem die <a href="https://uahelp.wiki">Website UAgelp.Wiki</a>, einen <a href="https://www.youtube.com/@UAhelp">Youtube-Kanal</a> und eine <a href="https://www.tiktok.com/@uahelp_germany">Тiktok-Präsenz</a>. </p>`,
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
                "Mit Stand zum {{today}} ist dies die maximale Gültigkeitsdauer eines Aufenthaltstitels nach § 24 AufenthG. Ihr Aufenthaltstitel benötigt keine Sonderregelungen."),
            issueAfterExpiry: "Das Ausstellungsdatum des Aufenthaltstitels kann nicht nach dem Ablaufdatum liegen. Bitte überprüfen Sie Ihre Eingabe.",
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