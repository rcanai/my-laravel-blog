@extends('admin.master')

@section('title')
@lang('route.accounts') |&nbsp;
@endsection

@section('styles')
<link href="@assetTimestamp(css/admin.css)" rel="stylesheet">
@endsection

@section('content')
<h1 class="page-title">@lang('route.accounts')</h1>
<div class="page-body">
  <table-grid
    ref="table-grid"
    selectable=" "
    :columns="[
      { key: 'login_id',     name: '@lang("label.login_id")', width: 100 },
      { key: 'name',         name: '@lang("label.account.name")', width: 150 },
      { key: 'phonetic',     name: '@lang("label.phonetic")', width: 150 },
      { key: 'email',         name: '@lang("label.email")', width: 150 },
    ]"
    @click-row="openDialog">
    <template slot="actions">
      <button class="button-gray" @click="selectedRemoves">@lang('label.selected_removes')</button>
    </template>
  </table-grid>
</div>
@endsection

@section('scripts')
<script src="@assetTimestamp(js/admin/accounts/index.js)"></script>
@endsection
