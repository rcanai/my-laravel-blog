@extends('admin.master')

@section('title')
@lang('route.accounts') |&nbsp;
@endsection

@section('styles')
<link href="@assetTimestamp(css/home.css)" rel="stylesheet">
@endsection

@section('content')
<h1 class="page-title">@lang('route.accounts')</h1>
<div class="page-body">
  {{--  --}}
</div>
@endsection

@section('scripts')
<script src="@assetTimestamp(js/home.js)"></script>
@endsection
