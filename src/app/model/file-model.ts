export class FileModel {
    private _name: string;
    private _path: string;
    private _files: Array<string>;
    private _directories: Array<FileModel>;

    constructor() {
        this._name = '';
        this._path = '';
        this._files = [];
        this._directories = [];
    }

    // Getter and setter for 'name' property
    get name(): string {
        return this._name;
    }

    set name(name: string) {
        this._name = name;
    }

    // Getter and setter for 'path' property
    get path(): string {
        return this._path;
    }

    set path(path: string) {
        this._path = path;
    }

    // Getter and setter for 'files' property
    get files(): Array<string> {
        return this._files;
    }

    set files(files: Array<string>) {
        this._files = files;
    }

    // Getter and setter for 'directories' property
    get directories(): Array<FileModel> {
        return this._directories;
    }

    set directories(directories: Array<FileModel>) {
        this._directories = directories;
    }
}
