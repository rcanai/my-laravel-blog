@extends('_layouts.master')

@section('title')
@lang('route.login') |&nbsp;
@endsection

@section('styles')
<link href="@assetTimestamp(css/auth.css)" rel="stylesheet">
@endsection

@section('content')
<h1 class="page-title">@lang('route.login')</h1>
<div class="page-body">
  <form id="form-login" method="POST" action="{{ route('login') }}" autocomplete="off">
    @csrf
    @method('post')
    <label>@lang('label.login_id')</label>
    <input type="text" name="login_id" autocomplete="off">
    <div>&nbsp;</div>
    <label>@lang('label.password')</label>
    <input type="password" name="password" autocomplete="off">
    <div>&nbsp;</div>
    <button type="submit" class="button-primary">
      @lang('route.login')
    </button>
  </form>
</div>
@endsection

@section('scripts')
<script>
  new Vue({ el: '#app' });
</script>
@endsection
