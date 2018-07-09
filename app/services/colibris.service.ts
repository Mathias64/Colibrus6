import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Serie } from '~/modele/serie';

import { knownFolders, File, Folder } from "file-system";

@Injectable()
export class ColibrisService {
    public adr:string = "http://www.exlineo.com/dev/ns/colibris/";

    public folderName: string;
    public fileName: string;
    public fileTextContent: string;

    public successMessage: string;
    public writtenContent: string;
    public isItemVisible: boolean = false;

    public file: File;
    public folder: Folder;

    constructor(private http: HttpClient) { }


    getSeries() {
        return this.http.get(this.adr + 'series.json');
    }

    /**
     * Ecrire les données dans le système local
     */
    public ecrireFichierLocal(data, f='series.json') {
        // >> fs-create-all-code
        let documents = knownFolders.documents();
        this.folder = documents.getFolder(this.folderName || "testFolder");
        this.file = this.folder.getFile(f || ("testFile" + ".txt"));
        console.log("Fichier local ", this.file, this.file.path);

        this.file.writeText(JSON.stringify(data) || "Data vide")
            .then(result => {
                this.file.readText()
                    .then(res => {
                        this.successMessage = "Successfully saved in " + this.file.path;
                        this.writtenContent = res;
                        this.isItemVisible = true;
                        console.log(this.successMessage);
                    });
            }).catch(err => {
                console.log(err);
            });
        // << fs-create-all-code
    }

    /**
     * récupérer les données du fichier local
     * @param {string} src fichier à lire pour récupérer des données
     */
    public lireFichierLocal(src: string='series.json') {
        return this.file.readText();
        // .then(res => {
        //     console.log(res);
        //     return JSON.parse(res);
        // });
    }

}
