import { Component, OnInit } from "@angular/core";
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { ColibrisService } from "~/services/colibris.service";
import { Serie } from "~/modele/serie";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    public listeSeries: Array<Serie>;

    constructor(public colServ:ColibrisService) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        this.colServ.getSeries().subscribe(
            data => {
                console.log("Données chargées : ", data);
                this.listeSeries = <Array<Serie>>data;
                this.colServ.ecrireFichierLocal(data);
            }
        );
    }

    /**
     * Gestion du menu latéral
     */
    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
