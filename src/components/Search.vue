<template>
    <div>
        <h2>People Search</h2>
        <md-field md-inline>
            <label>People Search</label>
            <md-input v-model="criteria" v-on:keyup.13="search()"></md-input>
        </md-field>
        
        
        <div class="md-layout md-gutter">
            <md-card v-for="person in people" :key="person.subjectId"  class="person-card md-layout-item md-medium-size-100 md-small-size-100 md-xsmall-size-100 md-elevation-24">
                <md-card-header class="md-alignment-space-between">
                    <md-avatar>
                        <img :src="person.picture" alt="People">
                    </md-avatar>
                    <div>
                        <div class="md-title md-alignment-top-left">{{ person.name }} <md-icon class="md-accent" v-if="person.verified">verified_user</md-icon></div>
                    
                        <div class="md-subhead">{{ person.professionalHeadline }}</div>
                    </div>
                </md-card-header>

                <md-card-content>
                    <div class="person_skills">
                        <div v-for="skill in person.skills.slice(0, 5)" :key="skill.name" class="person_skill md-elevation-12">
                            {{ skill.name }}
                        </div>
                    </div>
                </md-card-content>

                <md-card-actions>
                    <md-switch v-model="person.remoter" class="md-accent md-layout-item">Looking for remote jobs?</md-switch>
                    <md-button class="md-primary md-raised" @click="person.showDialog = true">Options</md-button>
                    <PersonOptions :options="person.openTo" :showDialog="person.showDialog" v-on:close-dialog="person.showDialog = false" />
                </md-card-actions>
            </md-card>
        </div>
    </div>
</template>

<script>
import PersonOptions from './PersonOptions.vue'
export default {
    name: 'search',
    data() {
        return{
            criteria: '',
            people: []
        };
    },
    components: {
      PersonOptions
    },
    methods: {
        search() {
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
                this.people = data.results.map(obj=> ({ ...obj, showDialog: false }))
                console.log('Success:', this.people);
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
    }

    .person_skill {
        margin: 10px;
    }

    .person_header{
        display: flex;
    }
</style>