import { AsyncSubject, Subject, Observable } from 'rxjs';
import Centrifuge from "centrifuge";
import { random } from '../../../common';

export const donationAlertsService = {
    publish: new Subject(),
    join: new Subject(),
    sub: new Subject(),
}

const DonationsSubscribe = function () {//только для donationalerts.com
    const messageService = {
        publish: message => donationAlertsService.publish.next(message.data),
        join: message => donationAlertsService.join.next(message),
        subscribe: context => {
            donationAlertsService.sub.next(context);
        },
    };

    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijg2M2Q5MzRkZDAyYzFlZTVhYjdjZmNiMmJkZmViNWQ3M2E5ODBkN2QyMDY2ZTEwNjQyNTU2YjFkNDk1MzFhZDJiMWM3N2NjNmQwYzcwY2ZiIn0.eyJhdWQiOiIyMzAiLCJqdGkiOiI4NjNkOTM0ZGQwMmMxZWU1YWI3Y2ZjYjJiZGZlYjVkNzNhOTgwZDdkMjA2NmUxMDY0MjU1NmIxZDQ5NTMxYWQyYjFjNzdjYzZkMGM3MGNmYiIsImlhdCI6MTU3NjgzOTA3NywibmJmIjoxNTc2ODM5MDc3LCJleHAiOjIyMDc5OTEwNzcsInN1YiI6IjEwMDQ5MzgiLCJzY29wZXMiOlsib2F1dGgtZG9uYXRpb24tc3Vic2NyaWJlIiwib2F1dGgtdXNlci1zaG93Iiwib2F1dGgtZG9uYXRpb24taW5kZXgiXX0.Dpsi70RYAWIoZHFNO4KLj2PGNG1ge0oZlGr2MB-t2IHeBMaoXLy70jN7qtK3RxPQ3F3qZJxaOspb66AcVWsOAJ7iO-Nej5geMDbcVbHXPIJHPYc-GGHVGcrSdg5AKoZ6vixREU4RoKgW9WAGDmIUllZGH3o1WmAPNYQBAU1u1sdQ__0K5bCW2fBhPpzzgc_vD2rYsj8tFneLz2WVNuEcn4INUIJRkbKZo3KCEbXrZ9DzIQ5MmY0k_A-0-YPqX9pPHVWyomH-u2gZYLZqTY-w2mYnLGgYgpweliUZupoYxTcwnrX2w7QkSKsoh7n49RD1C9TSAYNHnNGwVetkQ8v5PWsKITd9WYq79GkVXom1cdJkL8khUc0VHnJOb0dnh-b33sN2VvDa_3birr6WRq7Ezwu5TCjyEJUvFL17UZ5I3K05DGVEIIsJp2C6iwhwPZFiS-6AvVON5C4avBI35bUS-5NbsVxFdK6p7bbMrz9VK9ksYHzobR-xriZ-tvS27RigNqLe5SehicjIOvg6uj-j8GM9wYC1-7CjuVn-aO55uxFP3xxx0cmHMNCOOxXho7HRc3BsuJn6nGBMyRjpXe7ayTuBgePO6syH2ADw-CQ2FGMGON25BOLWPD9sr3g6kyknPkGURWo_-GZZF8olRsO4XiOkApk8qgPofnqs9dyLKSM';

    var centrifuge = new Centrifuge('wss://centrifugo.donationalerts.com/connection/websocket', {
        subscribeEndpoint: "https://www.donationalerts.com/api/v1/centrifuge/subscribe",
        subscribeHeaders: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    });

    centrifuge.setToken("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyMzAifQ.dWMUp76BGZoqaylv-Idb239Izx2nsTPgGSvUmiFNyXI");

    centrifuge.subscribe('$alerts:donation_1004938', messageService);

    centrifuge.connect();
}();