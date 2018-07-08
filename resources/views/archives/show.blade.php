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
<a href="{{url('archives')}}">@lang('記事一覧へ')</a>
@endsection

@section('scripts')
{{--  --}}
@endsection
