@extends('admin.master')

@section('title')
@lang('route.admin') |&nbsp;
@endsection

@section('styles')
<link href="@assetTimestamp(css/admin.css)" rel="stylesheet">
@endsection

@section('content')
<h1 class="page-title">@lang('route.admin')</h1>
<div class="page-body">
  {{--  --}}
</div>
@endsection

@section('scripts')
<script src="@assetTimestamp(js/admin/iondex.js)"></script>
@endsection
