<?php

namespace Botble\Support\Repositories\Caches;

use Botble\Support\Criteria\AbstractCriteria;
use Botble\Support\Criteria\Contracts\CriteriaContract;
use Botble\Support\Repositories\Interfaces\RepositoryInterface;
use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Query\Builder;
use Illuminate\Support\Collection;

abstract class CacheAbstractDecorator implements RepositoryInterface
{
    /**
     * @var mixed
     */
    protected $repository;

    /**
     * @var mixed
     */
    protected $cache;

    /**
     * @return mixed
     */
    public function getCacheInstance()
    {
        return $this->cache;
    }

    /**
     * @return array
     * @author Tedozi Manson
     */
    public function getCriteria()
    {
        return $this->getDataWithoutCache(__FUNCTION__, func_get_args());
    }

    /**
     * @param CriteriaContract $criteria
     * @return $this
     * @author Tedozi Manson
     */
    public function pushCriteria(CriteriaContract $criteria)
    {
        $this->getDataWithoutCache(__FUNCTION__, func_get_args());
        return $this;
    }

    /**
     * @param AbstractCriteria|string $criteria
     * @return $this
     * @author Tedozi Manson
     */
    public function dropCriteria($criteria)
    {
        $this->getDataWithoutCache(__FUNCTION__, func_get_args());
        return $this;
    }

    /**
     * @param bool $bool
     * @return $this
     * @author Tedozi Manson
     */
    public function skipCriteria($bool = true)
    {
        $this->getDataWithoutCache(__FUNCTION__, func_get_args());
        return $this;
    }

    /**
     * @return $this
     * @author Tedozi Manson
     */
    public function applyCriteria()
    {
        $this->getDataWithoutCache(__FUNCTION__, func_get_args());
        return $this;
    }

    /**
     * @param CriteriaContract $criteria
     * @return mixed
     * @author Tedozi Manson
     */
    public function getByCriteria(CriteriaContract $criteria)
    {
        return $this->getDataIfExistCache(__FUNCTION__, func_get_args());
    }

    /**
     * @return mixed
     * @author Dung Thinh
     */
    public function getModel()
    {
        return $this->repository->getModel();
    }

    /**
     * Get table name.
     *
     * @return string
     * @author Dung Thinh
     */
    public function getTable()
    {
        return $this->repository->getTable();
    }

    /**
     * Get screen
     *
     * @return string
     * @author Dung Thinh
     */
    public function getScreen() : string
    {
        return $this->repository->getScreen();
    }

    /**
     * @param $data
     * @param $screen
     * @param bool $is_single
     * @return Builder
     * @author Dung Thinh
     */
    public function applyBeforeExecuteQuery($data, $screen, $is_single = false)
    {
        return $this->repository->applyBeforeExecuteQuery($data, $screen, $is_single);
    }

    /**
     * Make a new instance of the entity to query on.
     * @param array $with
     * @return mixed
     * @author Dung Thinh
     */
    public function make(array $with = [])
    {
        return $this->repository->make($with);
    }

    /**
     * Retrieve model by id regardless of status.
     *
     * @param int $id model ID
     * @param array $with
     * @return Object object of model information
     * @author Dung Thinh
     */
    public function findById($id, array $with = [])
    {
        return $this->getDataIfExistCache(__FUNCTION__, func_get_args());
    }

    /**
     * @param $id
     * @param array $with
     * @return mixed
     * @author Dung Thinh
     */
    public function findOrFail($id, array $with = [])
    {
        return $this->getDataIfExistCache(__FUNCTION__, func_get_args());
    }

    /**
     * @param $function
     * @param $args
     * @return mixed
     * @author Dung Thinh
     */
    public function getDataIfExistCache($function, array $args)
    {
        try {
            $cacheKey = md5(get_class($this) . $function . serialize(request()->input()) . serialize(url()->current()) . serialize(func_get_args()));

            if ($this->cache->has($cacheKey)) {
                return $this->cache->get($cacheKey);
            }

            $cacheData = call_user_func_array([$this->repository, $function], $args);

            // Store in cache for next request
            $this->cache->put($cacheKey, $cacheData);

            return $cacheData;
        } catch (Exception $ex) {
            info($ex->getMessage());
            return call_user_func_array([$this->repository, $function], $args);
        }
    }

    /**
     * @param $function
     * @param array $args
     * @return mixed
     * @author Dung Thinh
     */
    public function getDataWithoutCache($function, array $args)
    {
        return call_user_func_array([$this->repository, $function], $args);
    }

    /**
     * Find a single entity by key value.
     *
     * @param array $condition
     * @param array $select
     * @param array $with
     * @return mixed
     * @author Dung Thinh
     */
    public function getFirstBy(array $condition = [], array $select = [], array $with = [])
    {
        return $this->getDataIfExistCache(__FUNCTION__, func_get_args());
    }

    /**
     * @param string $column
     * @param string $key
     * @return mixed
     * @author Dung Thinh
     */
    public function pluck($column, $key = null)
    {
        return $this->getDataIfExistCache(__FUNCTION__, func_get_args());
    }

    /**
     * Get all models.
     *
     * @param array $with Eager load related models
     * @return mixed
     * @author Dung Thinh
     */
    public function all(array $with = [])
    {
        return $this->getDataIfExistCache(__FUNCTION__, func_get_args());
    }

    /**
     * Get all models by key/value.
     *
     * @param array $condition
     * @param array $with
     * @param array $select
     * @return Collection
     * @author Dung Thinh
     */
    public function allBy(array $condition, array $with = [], array $select = ['*'])
    {
        return $this->getDataIfExistCache(__FUNCTION__, func_get_args());
    }

    /**
     * @param array $data
     * @return mixed
     * @author Dung Thinh
     */
    public function create(array $data)
    {
        return $this->flushCacheAndUpdateData(__FUNCTION__, func_get_args());
    }

    /**
     * @param $function
     * @param $args
     * @param boolean $flushCache
     * @author Dung Thinh
     * @return mixed
     */
    public function flushCacheAndUpdateData($function, $args, $flushCache = true)
    {
        if ($flushCache) {
            $this->cache->flush();
        }

        return call_user_func_array([$this->repository, $function], $args);
    }

    /**
     * Create a new model.
     *
     * @param Model|array $data
     * @param array $condition
     * @return false|Model
     * @author Dung Thinh
     */
    public function createOrUpdate($data, $condition = [])
    {
        return $this->flushCacheAndUpdateData(__FUNCTION__, func_get_args());
    }

    /**
     * Delete model.
     *
     * @param Model $model
     * @return bool
     * @author Dung Thinh
     */
    public function delete(Model $model)
    {
        return $this->flushCacheAndUpdateData(__FUNCTION__, func_get_args());
    }

    /**
     * @param array $data
     * @param array $with
     * @return mixed
     * @author Dung Thinh
     */
    public function firstOrCreate(array $data, array $with = [])
    {
        return $this->flushCacheAndUpdateData(__FUNCTION__, func_get_args());
    }

    /**
     * @param array $condition
     * @param array $data
     * @return mixed
     * @author Dung Thinh
     */
    public function update(array $condition, array $data)
    {
        return $this->flushCacheAndUpdateData(__FUNCTION__, func_get_args());
    }

    /**
     * @param array $select
     * @param array $condition
     * @return mixed
     * @author Dung Thinh
     */
    public function select(array $select = ['*'], array $condition = [])
    {
        return $this->getDataWithoutCache(__FUNCTION__, func_get_args());
    }

    /**
     * @param array $condition
     * @return mixed
     * @author Dung Thinh
     */
    public function deleteBy(array $condition = [])
    {
        return $this->flushCacheAndUpdateData(__FUNCTION__, func_get_args());
    }

    /**
     * @param array $condition
     * @return mixed
     * @author Dung Thinh
     */
    public function count(array $condition = [])
    {
        return $this->getDataIfExistCache(__FUNCTION__, func_get_args());
    }

    /**
     * @param $column
     * @param array $value
     * @param array $args
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     * @author Dung Thinh
     */
    public function getByWhereIn($column, array $value = [], array $args = [])
    {
        return $this->getDataIfExistCache(__FUNCTION__, func_get_args());
    }

    /**
     * @param array $params
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator|\Illuminate\Database\Eloquent\Collection|Collection|mixed
     */
    public function advancedGet(array $params = [])
    {
        return $this->getDataIfExistCache(__FUNCTION__, func_get_args());
    }

    /**
     * @param array $condition
     * @return mixed
     * @author Dung Thinh
     */
    public function forceDelete(array $condition = [])
    {
        return $this->flushCacheAndUpdateData(__FUNCTION__, func_get_args());
    }

    /**
     * @param array $condition
     * @return mixed
     * @author Dung Thinh
     */
    public function restoreBy(array $condition = [])
    {
        return $this->flushCacheAndUpdateData(__FUNCTION__, func_get_args());
    }

    /**
     * Find a single entity by key value.
     *
     * @param array $condition
     * @param array $select
     * @return mixed
     * @author Dung Thinh
     */
    public function getFirstByWithTrash(array $condition = [], array $select = [])
    {
        return $this->getDataIfExistCache(__FUNCTION__, func_get_args());
    }

    /**
     * @param array $data
     * @return bool
     * @author Dung Thinh
     */
    public function insert(array $data)
    {
        return $this->flushCacheAndUpdateData(__FUNCTION__, func_get_args());
    }

    /**
     * @param array $condition
     * @return mixed
     */
    public function firstOrNew(array $condition)
    {
        return $this->getDataIfExistCache(__FUNCTION__, func_get_args());
    }
}
