@extends('admin.master')

@section('title')
@lang('route.accounts') |&nbsp;
@endsection

@section('styles')
{{-- <link href="@assetTimestamp(css/admin.css)" rel="stylesheet"> --}}
@endsection

@section('content')
<h1 class="page-title">@lang('route.accounts')</h1>
<div class="page-body">
  <input type="hidden" id="account-id" value="{{$id}}">
  <div class="form">
    <div class="form-item item-full">
      <label class="form-label">
        @lang('label.account.name')<span class="required">@lang('*')</span>
      </label>
      <input type="text" class="form-control" v-model="account.name">
    </div>
    <div class="form-item item-full">
      <label class="form-label">@lang('label.phonetic')</label>
      <input type="text" class="form-control" v-model="account.phonetic">
    </div>
    <div class="form-item item-full">
      <label class="form-label">@lang('label.login_id')</label>
      <input type="text" class="form-control" v-model="account.login_id">
    </div>
    <div class="form-item item-full">
      <label class="form-label">@lang('label.email')</label>
      <input type="email" class="form-control" v-model="account.email">
    </div>
    <div class="form-item item-full">
      <label class="form-label">@lang('label.password')</label>
      <input type="password" class="form-control" v-model="account.password">
    </div>
    <div class="form-item item-full">
      <label class="custom-checkbox">
        <input type="checkbox" name="custom-checkbox" v-model="account.deleted">
        <span></span>@lang('deleted')
      </label>
    </div>
  </div>
  <div>&nbsp;</div>
  <div class="form-item item-half">
    <button type="button" class="button-success" @click.prevent="register">
      @lang('label.register')
    </button>
    <button type="button" class="button-light" @click.prevent="back">
      @lang('label.back')
    </button>
  </div>
</div>
@endsection

@section('scripts')
<script src="@assetTimestamp(js/admin/accounts/edit.js)"></script>
@endsection
