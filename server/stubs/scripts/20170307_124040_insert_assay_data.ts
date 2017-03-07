import { OracleDbHelper } from '../oracle-db-helper';
    
class GenerateAssayData {

    db = new OracleDbHelper(require('../../config/app.config.dev').database.resultdb);

    projectCodes = [ 500, 522, 152, 352, 616, 253, 222, 512, 162, 632, 162];

    constructor() { }

    generate() {
        let brdIdIterator = 1;

        this.db.connect((err, conn) => {
            
            // UPLOAD_19FNMR
            for(let i = 0; i < 30; i++) {
                var sql = this.db.generateSqlFromJson("UPLOAD_19FNMR",
                    this.upload_19fnmr(this.padDigits("BRD-", brdIdIterator++, 5), "Added as stub data", null, brdIdIterator)
                );
                this.save(conn, sql.statement, sql.bindValues);
            }

            // UPLOAD_19FNMR_LIGAND
            for(let i = 0; i < 30; i++) {
                var sql = this.db.generateSqlFromJson("UPLOAD_19FNMR_LIGAND",
                    this.upload_19fnmr_ligand(this.padDigits("BRD-", brdIdIterator++, 5), "Added as stub data", null, brdIdIterator)
                );
                this.save(conn, sql.statement, sql.bindValues);
            }

            // UPLOAD_1PT_SPR
            for(let i = 0; i < 30; i++) {
                var sql = this.db.generateSqlFromJson("UPLOAD_1PT_SPR",
                    this.upload_1pt_spr(this.padDigits("BRD-", brdIdIterator++, 5), "Added as stub data", null, brdIdIterator)
                );
                this.save(conn, sql.statement, sql.bindValues);
            }

            // UPLOAD_1PT_SPR_LIGAND
            for(let i = 0; i < 30; i++) {
                var sql = this.db.generateSqlFromJson("UPLOAD_1PT_SPRWITHLIGAND",
                    this.upload_1pt_spr_ligand(this.padDigits("BRD-", brdIdIterator++, 5), "Added as stub data", null, brdIdIterator)
                );
                this.save(conn, sql.statement, sql.bindValues);
            }
        });
    }

    save(conn, statement: string, bindValues: string[]) {
        this.db.insert(conn, statement, bindValues, (err, conn) => { 
            if(err) {
                console.log(err); 
            }
        });
    }


    //
    /***********************
        Assay Data Shells
    ***********************/
    //
    
    // UPLOAD_19FNMR
    upload_19fnmr(brdId, comments, operator, uniqueId) {
        return { 
            BROAD_ID: brdId,
            SAMPLE_ID: this.padDigits("SMP-", this.randomInt(100, 900), 5),
            PROJECT_CODE: this.randomOne(this.projectCodes),
            KD_UM: this.randomUm(),
            BOTTOM_COMPOUND_CONC_UM: this.randomDecimal(0, 1),
            TOP_COMPOUND_CONC_UM: this.randomDecimal(0, 1),
            NUMBER_OF_DATA_PTS: this.randomInt(1, 50),
            COMMENTS: comments,
            PROTEIN_UM: this.randomUm(),
            INSTRUMENT_ID: this.randomInstrument(),
            PROTEIN_ID: this.randomProtein(),
            PERCENT_DMSO_D6: this.randomPercent(),
            PERCENT_D2O: this.randomPercent(),
            RUN_DATE: this.randomDateStr,
            OPERATOR: operator,
            PROTOCOL_ID: this.randomProtocol(),
            RAW_DATA_FILE_NAME: this.randomDataFileName(false),
            REFERENCE_FILE_NAME: this.randomDataFileName(true),
            DIRECTORY_FOLDER: '/data',
            UNIQUE_ID: uniqueId
        }
    }

    // UPLOAD_19FNMR_LIGAND
    upload_19fnmr_ligand(brdId, comments, operator, uniqueId) {
        return Object.assign({
            LIGAND_ID: this.randomLigandId(),
            LIGAND_NAME: this.randomLigandName(),
            LIGAND_CONC_UM: this.randomUm(),
        },
            this.upload_19fnmr(brdId, comments, operator, uniqueId)
        );
    }

    // UPLOAD_1PT_SPR
    upload_1pt_spr(brdId, comments, operator, uniqueId) {
        return {
            BROAD_ID: brdId,
            SAMPLE_ID: this.padDigits("SMP-", this.randomInt(100, 900), 5),
            PROJECT_CODE: this.randomOne(this.projectCodes),
            COMPOUND_RU: this.randomRu(),
            RMAX_THEORETICAL: this.randomDecimal(0, 1),
            BINDING: this.randomDecimal(0, 1),
            FLOW_CELL: this.randomFlowCell(),
            CYCLE_: this.randomInt(1, 100),
            SENSORGRAM_CATEGORY: this.randomInt(1, 100),
            COMMENTS: comments,
            PROTEIN_MW: this.randomMw(),
            PROTEIN_RU: this.randomRu(),
            COMPOUND_MW: this.randomMw(),
            TOP_COMPOUND_UM: this.randomUm(),
            INSTRUMENT: this.randomInstrument(),
            DATE_: this.randomDateStr(),
            PROTEIN_ID: this.randomProtein(),
            OPERATOR: operator,
            PROTOCOL_ID: this.randomProtocol(),
            RAW_DATA_FILE_NAME: this.randomDataFileName(false),
            DIRECTORY_FOLDER: this.randomDirectory(),
            UNIQUE_ID: uniqueId,
            IMAGE_ID: this.randomImageId(),
            TIMESTAMP: this.randomTimestamp()
        }
    }

    // UPLOAD_1PT_SPR_LIGAND
    upload_1pt_spr_ligand(brdId, comments, operator, uniqueId) {
        let data = Object.assign({  
            PERCENT_BINDING: this.randomPercent(),
            COMPLEX_RU: this.randomRu(),
            LIGAND_MW: this.randomMw(),
            COMPLEX_MW: this.randomMw(),
            COMPOUND_UM: this.randomUm(),
            LIGAND_UM: this.randomUm(),
            LIGAND_ID: this.randomLigandId(),
            LIGAND_NAME: this.randomLigandName(),
            CHIP_LOT: this.padDigits("CHP-", this.randomInt(1, 600), 5),
            FLOW_CELL_: this.randomFlowCell(),
            COMPLEX_RU_: this.randomRu()
        },
            this.upload_1pt_spr(brdId, comments, operator, uniqueId)
        );
        
        // Some fields don't exist in the ligand table for some reason
        delete data.TOP_COMPOUND_UM;
        delete data.PROTEIN_RU;
        delete data.BINDING;
        
        return data;
    }


    //
    /***********************
        Helper functions
    ***********************/
    //
    randomLigandId() {
        return this.padDigits("LIG-", this.randomInt(100,900), 5);
    }

    randomLigandName() {
        return this.padDigits("LIG-NAM-", this.randomInt(100,900), 5);
    }

    randomFlowCell() {
        return this.padDigits("FLC-", this.randomInt(100, 900), 5)
    }

    randomProtein() {
        return this.padDigits("PRT-", this.randomInt(100, 900), 5);
    }

    randomPercent() {
        return this.randomDecimal(0, 1) * 100;
    }

    randomDataFileName(isRef: boolean) {
        return "file" + (isRef ? '-ref' : '') + this.randomInt(500, 50000) + ".xlsx";
    }

    randomDirectory() {
        return '/';
    }

    randomImageId() {
        return this.padDigits("IMG-", this.randomInt(100, 900), 5);
    }

    randomProtocol() {
        return this.padDigits("PRO-", this.randomInt(100, 900), 5);
    }

    randomDateStr() {
        return '2017-03-07';
    }

    randomTimestamp() {
        return new Date();
    }

    randomRu() {
        return this.randomDecimal(0, 1);
    }

    randomMw() {
        return this.randomDecimal(5, 300);
    }

    randomInstrument() {
        return this.padDigits("INS-", this.randomInt(100, 900), 5);
    }

    randomUm() {
        return this.randomDecimal(0, 1);
    }

    padDigits(prefix: string, number: number, digits: number) {
        return prefix + Array(Math.max(digits - String(number).length + 1, 0)).join("0") + number;
    }

    randomInt(min, max) {
        if(min == 0) {
            console.log('0 is not valid as a minimum for int');
            return 1;
        }
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    randomDecimal(min, max) {
        return Math.random() * (max - min) + min;
    }

    randomOne(arr: any[]) {
        var randomIndex = this.randomInt(1, arr.length);
        return arr[randomIndex - 1];
    }
}

new GenerateAssayData().generate();