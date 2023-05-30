import { Component, OnInit} from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import * as powerbiClient from 'powerbi-client';
import * as models from 'powerbi-models';
import { report } from 'process';

let loadedResolve: any, reportLoaded = new Promise((res) => { loadedResolve = res; });
let renderedResolve: any, reportRendered = new Promise((res) => { renderedResolve = res; });
const powerbi: powerbiClient.service.Service = window["powerbi"];

@Component({

    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {


    embedConfig : any
    constructor(public layoutService: LayoutService) {
       
    }

    ngOnInit() {
        this.embedConfig = {
          type: 'report',
          id: 'ae571d60-6640-4e19-a85c-d73b39e8b76e',
          embedUrl: '',
          accessToken: '2c2aec12-567a-4c5f-a447-e3c2f7ae8ffb',
          settings: {
            panes: {
              filters: {
                expanded: false,
                  visible: false
                }
              }
            }
        }



       
    }

    async embedPowerBIReport() {
        /*-----------------------------------------------------------------------------------+
        |    Don't change these values here: access token, embed URL and report ID.          |
        |    To make changes to these values:                                                |
        |    1. Save any other code changes to a text editor, as these will be lost.         |
        |    2. Select 'Start over' from the ribbon.                                         |
        |    3. Select a report or use an embed token.                                       |
        +-----------------------------------------------------------------------------------*/
        // Read embed application token
        //let accessToken: string = EMBED_ACCESS_TOKEN;
    
        // Read embed URL
        let embedUrl: string = 'https://app.powerbi.com/reportEmbed?reportId=448043f3-edf9-4b44-a98f-e9981ea51607&autoAuth=true&ctid=2c2aec12-567a-4c5f-a447-e3c2f7ae8ffb';
    
        // Read report Id
        let embedReportId: string = '448043f3-edf9-4b44-a98f-e9981ea51607';
    
        // Read embed type from radio
        //let tokenType = TOKEN_TYPE;
    
        // We give All permissions to demonstrate switching between View and Edit mode and saving report.
        let permissions: models.Permissions = models.Permissions.All;
    
        // Create the embed configuration object for the report
        // For more information see https://go.microsoft.com/fwlink/?linkid=2153590
        let config: models.IReportEmbedConfiguration = {
            type: 'report',
            //tokenType: tokenType == '0' ? models.TokenType.Aad : models.TokenType.Embed,
            //accessToken: accessToken,
            embedUrl: embedUrl,
            id: embedReportId,
            permissions: permissions,
            settings: {
                panes: {
                    filters: {
                        visible: true
                    },
                    pageNavigation: {
                        visible: true
                    }
                }
            }
        };
    
        // Get a reference to the embedded report HTML element
      /*  let embedContainer: HTMLElement = document.getElementById('embedContainer');
    
        // Embed the report and display it within the div container.
        report = powerbi.embed(embedContainer, config) as powerbiClient.Report;
    
        // report.off removes all event handlers for a specific event
        report.off("loaded");
    
        // report.on will add an event handler
        report.on("loaded", function () {
            loadedResolve();
            report.off("loaded");
        });
    
        // report.off removes all event handlers for a specific event
        report.off("error");
    
        report.on("error", function (event: powerbiClient.service.ICustomEvent<any>) {
            console.log(event.detail);
        });
    
        // report.off removes all event handlers for a specific event
        report.off("rendered");
    
        // report.on will add an event handler
        report.on("rendered", function () {
            renderedResolve();
            report.off("rendered");
        });*/
    
    
    this.embedPowerBIReport();
    await reportLoaded;
    }
    }
