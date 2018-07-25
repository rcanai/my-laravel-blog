@extends('_layouts.master')

@section('title')
@lang('route.contacts') |&nbsp;
@endsection

@section('styles')
{{-- <link href="@assetTimestamp(css/contacts.css)" rel="stylesheet"> --}}
@endsection

@section('content')
<div>
  <h1>@lang('label.success')</h1>
  <p>@lang('label.contact_success')</p>
</div>
@endsection

@section('scripts')
{{--  --}}
@endsection
