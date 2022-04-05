import { Component, OnInit } from '@angular/core';
import {HelloService} from "./hello.service";

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css']
})
export class HelloComponent implements OnInit {

  helloMessage: String = ''

  constructor(private helloService: HelloService) { }

  ngOnInit(): void {
    this.helloService.getHello().subscribe((res) => {
      console.log(res.body)
      this.helloMessage = res.body || '';
    })
  }

}
