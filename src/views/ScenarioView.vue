<template>
    <div>
        <h2>Scenario Details</h2>
        <template v-if="!loading">
            <BorrowerInfoCard
                v-if="scenarioDetails.borFirstName"
                :scenario-identifier="(route.params.id as string)"
                :first-name="scenarioDetails.borFirstName"
                :last-name="scenarioDetails.borLastName"
                :email="scenarioDetails.borEmailAddress"
                :phone-number="scenarioDetails.borPhoneNumber"
                :rate-long-desc="scenarioDetails.rateLongDesc"
            />
            <QuoteResultTable
                v-if="
                    scenarioDetails.quoteResultList &&
                    scenarioDetails.quoteResultList.length > 0
                "
                :quote-results="scenarioDetails.quoteResultList"
            ></QuoteResultTable>

            <Button @click="console.log(scenarioDetails)">Log</Button>
        </template>
        <template v-else>
            <!-- Loading indicator or message -->
            <p>Loading...</p>
        </template>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import BorrowerInfoCard from "@/components/BorrowerInfoCard.vue";
import QuoteResultTable from "@/components/QuoteResultTable.vue";
import { onMounted, reactive, ref } from "vue";

const route = useRoute();
const loading = ref(true);
const scenarioDetails = reactive({
    borFirstName: "",
    borLastName: "",
    borEmailAddress: "",
    borPhoneNumber: "",
    rateLongDesc: "",
    quoteResultList: [],
});
onMounted(() => {
    getScenarioDetails();
});
function getScenarioDetails() {
    fetch(import.meta.env.VITE_API_URL + "/rate/GetPreviouslySavedRateQuote", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            scenarioIdentifier: route.params.id,
        }),
    })
        .then((response) => response.json())
        .then((data: any) => {
            scenarioDetails.borFirstName = data.borFirstName;
            scenarioDetails.borLastName = data.borLastName;
            scenarioDetails.borEmailAddress = data.borEmailAddress;
            scenarioDetails.borPhoneNumber = data.borPhoneNumber;
            scenarioDetails.rateLongDesc = data.rateLongDesc;
            scenarioDetails.quoteResultList = data.rateSummaryList;
        })
        .finally(() => {
            loading.value = false;
        });
}
</script>

<style scoped></style>
