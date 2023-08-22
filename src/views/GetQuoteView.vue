<template>
    <div class="layout">
        <div class="form-container">
            <h1>Get Quote</h1>
            <form @submit.prevent="onSubmit" class="form">
                <div class="label-input">
                    <BaseLabel> Property Value </BaseLabel>
                    <InputNumber
                        v-model="formData.propertyValueAmt"
                        inputId="integeronly"
                        :maxFractionDigits="0"
                        mode="currency"
                        currency="USD"
                        locale="en-US"
                    ></InputNumber>
                </div>
                <div class="label-input">
                    <BaseLabel> Requesting Loan Amount </BaseLabel>
                    <InputNumber
                        v-model="formData.requestingLoanAmt"
                        inputId="integeronly"
                        :maxFractionDigits="0"
                        mode="currency"
                        currency="USD"
                        locale="en-US"
                    ></InputNumber>
                </div>
                <div class="label-input">
                    <BaseLabel> Fico Score </BaseLabel>
                    <InputNumber
                        v-model="formData.ficoScore"
                        inputId="integeronly"
                        :maxFractionDigits="0"
                    ></InputNumber>
                </div>
                <div class="label-input">
                    <BaseLabel> Financial Type </BaseLabel>
                    <Dropdown
                        v-model="formData.finType"
                        :options="finTypeOptions"
                        optionLabel="name"
                        optionValue="value"
                        placeholder="Select a Financial Type"
                    ></Dropdown>
                </div>
                <div class="label-input">
                    <BaseLabel> Property Type </BaseLabel>
                    <Dropdown
                        v-model="formData.propertyType"
                        :options="propertyTypeOptions"
                        optionLabel="name"
                        optionValue="value"
                        placeholder="Select a Property Type"
                    ></Dropdown>
                </div>
                <div class="label-input">
                    <BaseLabel> Mortgage Term </BaseLabel>
                    <Dropdown
                        v-model="formData.amortTermMonths"
                        :options="mortgageTermOptions"
                        optionLabel="name"
                        optionValue="value"
                        placeholder="Select a Mortgage Term"
                    ></Dropdown>
                </div>
                <div class="card flex justify-content-center">
                    <Button
                        type="submit"
                        label="Request Quote"
                        :loading="loading.valueOf()"
                    ></Button>
                </div>
            </form>
        </div>
        <div v-if="true">
            {{ error.message }}
        </div>
        <!-- <div v-if="responseData.length !== 0" class="quote-results">
            <h1>Quote Results</h1>
            <div v-for="item in responseData" :key="item.rateId">
                <QuoteResult
                    :companyName="item.companyName"
                    :ratePct="item.ratePct"
                    :productName="item.productName"
                    :aprPct="item.aprPct"
                    :monthlyPaymentAmt="item.estimateMoPayment"
                    :feesAmt="item.feesAmt"
                />
            </div>
        </div> -->
        <div v-show="responseData.length !== 0" class="table-container">
            <div class="table-header">
                <h1>Quotes</h1>
                <Button
                    icon="pi pi-angle-double-right"
                    icon-pos="right"
                    label="Save"
                    @click="openModal"
                ></Button>
            </div>
            <QuoteResultTable :quote-results="responseData" />
        </div>
    </div>
    <DynamicDialog />
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import * as MockResponse from "@/mock-data/QuoteResponse.json";
import QuoteResult from "@/components/QuoteResult.vue";
import QuoteResultTable from "@/components/QuoteResultTable.vue";
import { useDialog } from "primevue/usedialog";
import SaveQuoteModal from "@/components/SaveQuoteModal.vue";
const dialog = useDialog();
const loading = ref(false);
const saveQuotesLoading = ref(false);

const formData = reactive({
    propertyValueAmt: 600000,
    requestingLoanAmt: 400000,
    ficoScore: 820,
    finType: "newmortgage",
    propertyType: "SingleFamily",
    amortTermMonths: 360,
    amortTermMonthsList: "360",
    amortType: "Fixed",
});
const responseData = ref([] as any[]);
const error = reactive({
    message: null as string | null,
});

const finTypeOptions = [
    { name: "New Mortgage", value: "newmortgage" },
    { name: "Refinance", value: "refinance" },
];
const propertyTypeOptions = [
    { name: "Single Family", value: "SingleFamily" },
    { name: "Condo", value: "Condo4OrFewerStories" },
    { name: "Townhouse", value: "TownHouse" },
    { name: "Multi Family", value: "MultiFamily2Units" },
];
const mortgageTermOptions = [
    { name: "30 Year", value: 360 },
    { name: "20 Year", value: 240 },
    { name: "15 Year", value: 180 },
    { name: "10 Year", value: 120 },
];

function onSubmit() {
    loading.value = true;
    fetch(import.meta.env.VITE_API_URL + "/rate/quoteprice", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            propertyValueAmt: formData.propertyValueAmt,
            requestingLoanAmt: formData.requestingLoanAmt,
            ficoScore: formData.ficoScore,
            finTypeList: formData.finType,
            propertyType: formData.propertyType,
            amortTermMonthsList: formData.amortTermMonths.toString(),
            amortType: formData.amortType,
        }),
    })
        .then((response) => {
            return response.json();
        })
        .then((data: any) => {
            responseData.value = data.rateSummaryList;
        })
        .catch((error) => {
            console.log(error);
            error.message = "Failed to Fetch, using mock data";
        })
        .finally(() => {
            loading.value = false;
        });
}

function openModal() {
    const dialogInstance = dialog.open(SaveQuoteModal, {
        data: {
            loading: saveQuotesLoading.value,
        },
        emits: {
            onSaveQuote: async (formData: any) => {
                await saveQuotes(formData);
                dialogInstance.close();
            },
        },
        props: {
            header: "Save Quotes",
            style: {
                width: "50vw",
            },
            breakpoints: {
                "960px": "75vw",
                "640px": "90vw",
            },
            modal: true,
        },
    });
}
async function saveQuotes(borrowerInfo: any) {
    saveQuotesLoading.value = true;
    return new Promise((resolve, reject) =>
        fetch(import.meta.env.VITE_API_URL + "/rate/savepricequote", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                rateShortDesc: "test",
                rateLongDesc: "test long",
                borFirstName: borrowerInfo.firstName,
                borLastName: borrowerInfo.lastName,
                quoteRequestParams: {
                    propertyValueAmt: formData.propertyValueAmt,
                    requestingLoanAmt: formData.requestingLoanAmt,
                    ficoScore: formData.ficoScore,
                    finTypeList: formData.finType,
                    propertyType: formData.propertyType,
                    amortTermMonthsList: formData.amortTermMonths.toString(),
                    amortType: formData.amortType,
                },
                rateSummaryList: responseData.value,
            }),
        })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                saveQuotesLoading.value = false;
                resolve("Quotes saved successfully.");
            })
    );
}
</script>

<style scoped>
.layout {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
.form-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: fit-content;
}
.form {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(auto, 1fr);
    grid-column-gap: 18px;
}
.label-input {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
}
@media screen and (min-width: 500px) {
    .label-input {
        width: 350px;
    }
    .form {
        grid-template-columns: repeat(2, 1fr);
    }
}

.quote-results {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}
.table-container {
    max-width: 70rem;
}
.table-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
}
</style>
