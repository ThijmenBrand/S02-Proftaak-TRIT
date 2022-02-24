<template>
    <div class="InformationPageMain">
        <div class="Overview"> 
            <h3 class="TribeTitle">Vue.js</h3>
            <div class="profile-container" >
                <profiletag v-for="profile in profiles" :key="profile" :name="profile"/>
            </div>
        </div>
            
        <div class="Articles">
            <p>Articles</p>
        </div>
    </div>
</template>

<script lang="ts">
import Profiletag from "./Components/Profiletag.vue";
export default {
    components:{
        Profiletag
    },
    setup(){
        const profiles = ["Profile1", "Profile2", "Profile3"];
        return {profiles};
    }
}

</script>

<style scoped>
p {
    color: white;
    margin:0;
}
.Overview{
    background-color:yellow;
    width: auto;
    height: 300px;
    margin: 0%;
    padding: 0%;

}
.Articles{
    background-color: black;
    height:1000px;
    margin: 0%;
    padding: 0%;
}
.TribeTitle{
    padding: 20px;
    padding-left: 40px;
}
.profile-container{
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;

}
</style>