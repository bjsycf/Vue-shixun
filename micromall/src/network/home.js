import {request} from "@/network/requests";

export function getHomeMultiData() {
    return request({
        url: '/home/multidata'
    })
}