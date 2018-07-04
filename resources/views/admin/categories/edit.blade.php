@extends('admin.master')

@section('title')
@lang('route.categories') |&nbsp;
@endsection

@section('styles')
{{-- <link href="@assetTimestamp(css/admin.css)" rel="stylesheet"> --}}
@endsection

@section('content')
<h1 class="page-title">@lang('route.categories')</h1>
<div class="page-body">
  <input type="hidden" id="category-id" value="{{$id}}">
  <div class="form">
    <div class="form-item item-full">
      <label class="form-label">
        @lang('label.name')<span class="required">@lang('*')</span>
      </label>
      <input type="text" class="form-control" v-model="category.name">
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
<script src="@assetTimestamp(js/admin/categories/edit.js)"></script>
@endsection
