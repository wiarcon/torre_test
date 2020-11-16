<template>
    <div>
        <md-dialog :md-active.sync="showDialog">
            <md-dialog-title>Job opportunities</md-dialog-title>
            <md-dialog-content>
                <div class="person_jobs" v-if="hasJobs()">
                    <md-card v-for="job in jobs.slice(0, 5)" :key="job.id"  class="person_job md-elevation-24">
                        <md-card-header class="md-alignment-space-between">
                            <md-avatar v-if="hasOrganization(job.organizations)">
                                <img :src="job.organizations[0].picture" alt="Job">
                            </md-avatar>
                            <div>
                                <div class="md-title md-alignment-top-left" v-if="hasOrganization(job.organizations)">{{ job.organizations[0].name }}</div>
                                <div class="md-subhead">{{ job.objective }}</div>
                            </div>
                        </md-card-header>

                        <md-card-content>
                            <div v-if="hasCompensation(job.compensation)">
                                <div v-if="job.compensation.data.code == 'range'">
                                    <md-icon class="md-accent">attach_money</md-icon>
                                    {{ getSalaryRange(job.compensation) }}
                                </div>
                                <div v-else>
                                    <md-icon class="md-accent">attach_money</md-icon>
                                    {{ getSalaryFixed(job.compensation) }}
                                </div>
                            </div>
                            <div class="job_skills">
                                <div v-for="skill in job.skills.slice(0, 5)" :key="skill.name" class="job_skill md-elevation-12">
                                    {{ skill.name }}
                                </div>
                            </div>
                        </md-card-content>
                    </md-card>
                </div>
                <md-empty-state v-else
                    md-icon="work"
                    md-label="There is no job offers at this moment.">
                </md-empty-state>
            </md-dialog-content>
            <md-dialog-actions>
                <md-button class="md-accent" @click="$emit('close-dialog')">Close</md-button>
            </md-dialog-actions>
        </md-dialog>
    </div>
</template>

<script>
export default {
    name: 'PersonJobs',
    props: ['jobs', 'showDialog'],
    data() {
        return{
            activeDialog: this.showDialog,
        };
    },
    methods: {
        getSalaryFixed(compensation){
            if (!this.hasCompensation(compensation)) return "";
            return `${compensation.data.currency} ${compensation.data.minAmount}/${compensation.data.periodicity}`;
        },
        getSalaryRange(compensation){
            if (!this.hasCompensation(compensation)) return "";
            return `${compensation.data.currency} ${compensation.data.minAmount} - ${compensation.data.maxAmount}/${compensation.data.periodicity}`;
        },
        hasCompensation(compensation){
            return compensation != null && compensation.visible;
        },
        hasJobs(){
            return this.jobs.length > 0;
        },
        hasOrganization(organizations){
            return organizations.length > 0;
        }
    }
};
</script>

<style scoped>
    .person_jobs{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-content: space-between;
        max-width: 480px;
    }

    .person_job {
        flex: 1 1 100%; /*grow | shrink | basis */
        margin: 5px;
        min-height: 60px;
        padding: 4px;
    }

    .job_skills{
        display: flex;
        flex-wrap: wrap;
        min-height: 84px;
    }

    .job_skill {
        margin: 10px;
        max-height: 22px;
    }

</style>