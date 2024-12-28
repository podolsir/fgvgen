import { installDatePicker } from "./datepicker";
import { strings_ru, strings_de } from "./resources";
import { templateSingle, templateDouble, templateOtherDates } from "./resources";
import { convertHashParams } from "./utils";
import parseDate from "date-fns/parse";
import parseISODate from "date-fns/parseISO";
import formatDate from "date-fns/format";
import formatDateISO from "date-fns/formatISO";
import isValidDate from "date-fns/isValid";
import addDate from "date-fns/add";
import subtractDate from "date-fns/sub";
import dateIsAfter from "date-fns/isAfter";
import dateIsBefore from "date-fns/isBefore";

const E = (x) => document.getElementById(x);

let initialized = false;

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
            ru: strings_ru,
            de: strings_de,
        }
    }).then((t) => {
        const _params = convertHashParams(window.location.href);
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
        if (b.getAttribute("data-switch-lang") == lang) {
            b.classList.add("active");
        }
    }
    updateLanguage();
    update();
}

document.addEventListener('DOMContentLoaded', () => {
    const _params = convertHashParams(window.location.href);
    
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

        let d = parseDate(dateString, "dd.MM.yyyy", new Date());
        if (!isValidDate(d)) {
            return;
        }
        elem.querySelector("[data-datepicker3-component=day]").value = d.getDate();
        elem.querySelector("[data-datepicker3-component=month]").value = d.getMonth();
        elem.querySelector("[data-datepicker3-component=year]").value = d.getFullYear();
        elem.setAttribute("data-datepicker3-value",  formatDateISO(d));
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
                issueDate: formatDate(issueDate, "dd.MM.yyyy"), 
                expiryDate: formatDate(expiryDate, "dd.MM.yyyy"),
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
            return `<li class="ms-3"><a href="${d.link}" target="_blank">${i18next.t(d.key)}</a></li>`
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
const endOfTemporaryProtection = new Date(2026, 2, 3);

// Be careful: issue and expiry dates of German permits are inclusive.

function isEligibleByDateSingle(issueDate, expiryDate) {
    return (dateIsAfter(addDate(expiryDate, {days: 1}), fgv2pivot)
         && dateIsBefore(subtractDate(issueDate, {days: 1}), fgv2pivot))
}

function isEligibleByDateDouble(issueDate, expiryDate) {
    return (dateIsAfter(addDate(expiryDate, {days: 1}), fgv1pivot)
         && dateIsBefore(subtractDate(issueDate, {days: 1}), fgv1pivot))
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
            message: i18next.t("result.notEligibleByDate", { expiryDate: formatDate(expiryDate, "dd.MM.yyyy") }),
        });                                     
    }
    createLetter24(issueDate, expiryDate);
}

function update() {
    if (!initialized) {
        return;
    }

    const _params = {}; 
    (() => {
        const issueDate = parseISODate(E("issueDate").getAttribute("data-datepicker3-value"));
        const expiryDate = parseISODate(E("expiryDate").getAttribute("data-datepicker3-value"));

        _params.i = isNaN(issueDate) ? "" : formatDate(issueDate, "dd.MM.yyyy");
        _params.e = isNaN(expiryDate) ? "" : formatDate(expiryDate, "dd.MM.yyyy");

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

        if (!isNaN(expiryDate) && dateIsAfter(expiryDate, endOfTemporaryProtection)) {
            updateAlert({
                type: 'success',
                iconType: 'check-circle',
                message: i18next.t("result.sufficientValidity", {
                    expiryDate: formatDate(expiryDate, "dd.MM.yyyy"),
                    today: formatDate(new Date(), "dd.MM.yyyy")}),
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
    })();

    _params.lang = i18next.language;
    const url = new URL(window.location.href);
    const keys = Object.keys(_params).sort();
    url.hash = keys.map((x) => `${x}=${_params[x]}`).join("/");
    history.replaceState(null, "", url);

}
