import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-playback',
  templateUrl: './playback.component.html',
  styleUrls: ['./playback.component.css']
})
export class PlaybackComponent implements OnInit, AfterViewInit {

  //Video player html5 element reference
  video

  isLandscape = false

  //BatteryInfo
  batteryLevel = "0%"
  isBatteryCharging = false
  DARK_MODE_BATTERY_LEVEL = 0.3

  //Dark mode switch flag
  enableDarkMode = false


  constructor() { }

  ngOnInit() {
    //Add the visibility change event listener
    document.addEventListener("visibilitychange", this.pageVisibilityHandler.bind(this), false)

    window.addEventListener("deviceorientation", this.deviceOrientationHandler.bind(this), false)


    this.updateBatteryInfo()
  }

  ngAfterViewInit() {
    //Get the video element
    this.video = document.getElementById('player')
  }


  updateBatteryInfo() {
    const that = this
    const nav: any = window.navigator
    nav.getBattery().then(function (batteryManager) {
      that.batteryLevel = batteryManager.level * 100 + "%"
      that.isBatteryCharging = batteryManager.charging
      batteryManager.addEventListener("chargingchange", function () {
        that.isBatteryCharging = batteryManager.charging
      })
      if (batteryManager.level >= that.DARK_MODE_BATTERY_LEVEL) {
        that.enableDarkMode = true
      } else {
        that.enableDarkMode = false
      }
    })
  }

  async pageVisibilityHandler() {
    if (document.hidden) {
      if (!this.video.paused) {
        this.video.pause()
        navigator.vibrate(300)
      }
    } else {
      if (this.video.paused) {
        this.video.play()
        navigator.vibrate(300)
      }
    }
  }

  deviceOrientationHandler(event) {
    if (screen.orientation.type == "landscape-primary" || screen.orientation.type == "landscape-secondary") {
      this.isLandscape = true
    } else {
      this.isLandscape = false
      if (document.fullscreenElement) {
        document.exitFullscreen()
      }
    }
  }

  gofull() {
    if (!document.fullscreenElement) {
      this.video.requestFullscreen()
    }
  }



  async share() {
    const shareData = {
      title: "Watch with me",
      text: "Watching big bunny video, yay!",
      url: "http://localhost:4200/"
    }
    //Typescript error workaround, assign navigator to a variable
    const nav: any = window.navigator;
    await nav.share(shareData)
    navigator.vibrate(300)
  }


}
