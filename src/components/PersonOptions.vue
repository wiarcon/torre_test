<template>
    <div>
        <md-dialog :md-active.sync="showDialog">
            <md-dialog-title>Open to</md-dialog-title>
            <div class="person_options">
                <md-switch value="advising" v-model="options" class="md-accent person_option">Advising</md-switch>
                <md-switch value="freelance-gigs" v-model="options" class="md-accent person_option">Freelance-gigs</md-switch>
                <md-switch value="internships" v-model="options" class="md-accent person_option">Internships</md-switch>
                <md-switch value="mentoring" v-model="options" class="md-accent person_option">Mentoring</md-switch>
                <md-switch value="full-time-employment" v-model="options" class="md-accent person_option">Full-time employment</md-switch>
                <md-switch value="part-time-employment" v-model="options" class="md-accent person_option">Part-time employment</md-switch>
                <md-switch value="hiring talent" v-model="options" class="md-accent person_option">Hiring talent</md-switch>
            </div>
            <md-dialog-actions>
                <md-button class="md-accent" @click="$emit('close-dialog')">Close</md-button>
            </md-dialog-actions>
        </md-dialog>
    </div>
</template>

<script>
export default {
    name: 'PersonOptions',
    props: ['options', 'showDialog'],
    data() {
        return{
            activeDialog: this.showDialog
        };
    },
    methods: {
        
    }
};
</script>

<style scoped>
    .person_options{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-content: space-between;
        max-width: 360px;
    }

    .person_option {
        flex: 1 1 30%; /*grow | shrink | basis */
        margin: 5px;
        min-height: 60px;
        padding: 4px;
    }

</style>