@extends('admin.master')

@section('title')
@lang('route.posts') |&nbsp;
@endsection

@section('styles')
{{-- <link href="@assetTimestamp(css/admin.css)" rel="stylesheet"> --}}
@endsection

@section('content')
<h1 class="page-title">@lang('route.posts')</h1>
<div class="page-body">
  <input type="hidden" id="post-id" value="{{$id}}">
  <div class="form">
    <div class="form-item item-full">
      <label class="form-label">
        @lang('label.post.title')<span class="required">@lang('*')</span>
      </label>
      <input type="text" class="form-control" v-model="post.title">
    </div>
    <div class="form-item item-full">
      <label class="form-label">
        @lang('label.post.content')<span class="required">@lang('*')</span>
      </label>
      <vue-editor class="form-control" v-model="post.content_html"></vue-editor>
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
<script src="@assetTimestamp(js/admin/posts/edit.js)"></script>
@endsection
