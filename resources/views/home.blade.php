@extends('_layouts.master')

@section('title')
@lang('Home') |&nbsp;
@endsection

@section('styles')
<link href="@assetTimestamp(css/home.css)" rel="stylesheet">
@endsection

@section('content')
<h1 class="page-title">@lang('route.home')</h1>
<div class="page-body">
  {{--  --}}
</div>
@endsection

@section('scripts')
<script src="@assetTimestamp(js/home.js)"></script>
@endsection
