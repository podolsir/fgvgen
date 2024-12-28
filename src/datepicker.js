import formatDateISO from "date-fns/formatISO";
import isValidDate from "date-fns/isValid";

export function installDatePicker(hostElement) {
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
        const newValue = isValidDate(d) ? formatDateISO(d) : "";
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