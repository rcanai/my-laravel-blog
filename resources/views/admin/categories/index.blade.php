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
  <table-grid
    ref="table-grid"
    selectable=" "
    :columns="[
      { key: 'name',  name: '@lang("label.name")', width: 300 },
      { key: 'updated_at',    name: '@lang("label.updated_at")', width: 150 },
    ]"
    @click-row="goEdit">
    <template slot="actions">
      <button class="button-primary" @click="goEdit">@lang('label.create')</button>
      <button class="button-gray" @click="selectedRemoves">@lang('label.selected_removes')</button>
    </template>
  </table-grid>
</div>
@endsection

@section('scripts')
<script src="@assetTimestamp(js/admin/categories/index.js)"></script>
@endsection
