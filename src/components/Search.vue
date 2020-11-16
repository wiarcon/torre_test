<template>
    <div>
        <h2>Please enter the name of the person you want to look for:</h2>
        <md-field md-inline>
            <label>People search</label>
            <md-input v-model="criteria" v-on:keyup.13="searchForPeople()"></md-input>
        </md-field>
        
        
        <div class="md-layout md-gutter">
            <md-card v-for="person in people" :key="person.subjectId"  class="person-card md-layout-item md-medium-size-100 md-small-size-100 md-xsmall-size-100 md-elevation-24">
                <md-card-header class="md-alignment-space-between">
                    <md-avatar>
                        <img :src="person.picture" alt="People">
                    </md-avatar>
                    <div>
                        <div class="md-title md-alignment-top-left">{{ person.name }} 
                            <span>
                                <md-icon class="md-accent" v-if="person.verified">verified_user</md-icon>
                                <md-tooltip md-direction="top">Verified Person</md-tooltip>
                            </span>
                        </div>
                    
                        <div class="md-subhead">{{ person.professionalHeadline }}</div>
                    </div>
                </md-card-header>

                <md-card-content>
                    <div class="person_skills" v-if="hasSkills(person.skills)">
                        <div v-for="skill in person.skills.slice(0, 5)" :key="skill.name" class="person_skill md-elevation-12">
                            {{ skill.name }}
                        </div>
                    </div>
                    <div v-else class="person_skills">
                        <div  class="person_skill md-elevation-12">
                            This person has not registered any skills.
                        </div>
                    </div>
                </md-card-content>

                <md-card-actions>
                    <md-switch v-model="person.remoter" class="md-accent md-layout-item">Looking for remote jobs?</md-switch>
                    <div class="person_actions">
                        <div class="person_action">
                            <md-button class="md-primary md-raised" @click="person.showDialogOptions = true">Options</md-button>
                            <md-tooltip md-direction="top">See the options this person is open to</md-tooltip>
                            <PersonOptions :options="person.openTo" :showDialog="person.showDialogOptions" v-on:close-dialog="person.showDialogOptions = false" />  
                        </div>
                        <div class="person_action">
                            <md-button class="md-primary md-raised" @click="searchForJobs(person)">Jobs</md-button>
                            <md-tooltip md-direction="top">See the possible jobs this person can apply</md-tooltip>
                            <PersonJobs :jobs="person.jobs" :showDialog="person.showDialogJobs" v-on:close-dialog="person.showDialogJobs = false" />  
                        </div>
                    </div>
                </md-card-actions>
            </md-card>
        </div>
    </div>
</template>

<script>
import PersonOptions from './PersonOptions.vue';
import PersonJobs from './PersonJobs.vue';
export default {
    name: 'search',
    data() {
        return{
            criteria: '',
            people: []
        };
    },
    components: {
      PersonOptions,
      PersonJobs
    },
    methods: {
        hasSkills(skills){
            return skills.length > 0;
        },
        searchForPeople() {
            const data = { "name": { "term": this.criteria }};
            fetch('https://search.torre.co/people/_search/?size=20&lang=en&aggregate=false&offset=0', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
                this.people = data.results.map(obj=> ({ ...obj, showDialogOptions: false, showDialogJobs: false, jobs: [] }))
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        },
        searchForJobs(person) {
            const data = {"skill/role":{"text":person.professionalHeadline,"experience":"potential-to-develop"}};
            fetch('https://search.torre.co/opportunities/_search/?offset=0&size=10&aggregate=false', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
                person.jobs = data.results.filter(function(job) {
                    return job.status.toLowerCase() === "open"
                });
                person.showDialogJobs = true;
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    }
};
</script>

<style scoped>
    .person-card{
        min-width: 480px;
        margin-bottom: 24px;
    }

    .person_skills{
        display: flex;
        flex-wrap: wrap;
        min-height: 84px;
    }

    .person_skill {
        margin: 10px;
        max-height: 22px;
    }

    .person_actions{
        display: flex;
        flex-wrap: wrap;
    }

    .person_action {
        margin: 10px;
    }

    .person_header{
        display: flex;
    }
</style>