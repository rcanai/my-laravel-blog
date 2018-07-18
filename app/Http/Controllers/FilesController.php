<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class FilesController extends Controller
{
    private $dir = 'files';

    public function __construct()
    {
        // pass
    }

    public function show($name = '')
    {
        return Storage::response($this->dir . '/' . $name);
    }

    public function upload()
    {
        $files = request('file', []);
        $savedFiles = [];
        foreach ($files as $file) {
            $extension = mb_strtolower($file->getClientOriginalExtension());
            $fileName = uniqid();
            $filePath = Storage::putFileAs($this->dir, $file, $fileName);
            $savedFile = new \stdClass();
            $savedFile->filePath = $filePath;
            $savedFile->originalName = $file->getClientOriginalName();
            $savedFile->extension = mb_strtolower($file->getClientOriginalExtension());
            $savedFile->url = url('files/' . $fileName);
            $savedFiles[] = $savedFile;
        }
        return $savedFiles;
    }
}
