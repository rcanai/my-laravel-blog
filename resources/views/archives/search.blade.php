@extends('_layouts.master')

@section('title')
@lang('route.search') |&nbsp;
@endsection

@section('styles')
{{-- <link href="@assetTimestamp(css/home.css)" rel="stylesheet"> --}}
@endsection

@section('content')
<div>
  <form action="{{url('archives')}}" method="GET">
    <div>
      <label for="search-text">@lang('label.search_text')</label>
      <input type="text" id="search-text" name="s" value="" maxlength="30" required>
    </div>
    <div>
      <button type="submit">@lang('label.search')</button>
    </div>
  </form>
</div>
@endsection

@section('scripts')
{{--  --}}
@endsection
