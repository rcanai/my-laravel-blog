@extends('_layouts.master')

@section('title')
{{$post->title}} |&nbsp;
@endsection

@section('styles')
{{--  --}}
@endsection

@section('content')
<div>{{$post->title}}</div>
<div>{!! $post->content_html !!}</div>
@endsection

@section('scripts')
{{--  --}}
@endsection
