<template>
    <div>
        <Header title="我的喵喵"/>
        <div id="content">
            <Login />
        </div>
        <NavTar />
    </div>
</template>

<script>
import Header from '@/components/Header'
import NavTar from '@/components/NavTar'
import Login from '@/components/Login'
export default {
    name:'mine',
    components:{
        Header,
        NavTar,
        Login
    }
}
</script>

<style>

</style>
