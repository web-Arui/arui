const state = {
    nm:window.localStorage.getItem('nm') || '北京',
    id:window.localStorage.getItem('id') || 1
}
const mutations = {
    CITY_INFO(state,paylaod){
        state.nm = paylaod.nm
        state.id = paylaod.id
    }
}
const actions = {

}


export default {
    namespaced:true,
    state,
    mutations,
    actions
}