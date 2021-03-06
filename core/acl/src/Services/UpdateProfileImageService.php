<?php

namespace Botble\ACL\Services;

use Botble\ACL\Repositories\Interfaces\UserInterface;
use Botble\Support\Services\ProduceServiceInterface;
use Exception;
use File;
use Illuminate\Http\Request;
use Storage;

class UpdateProfileImageService implements ProduceServiceInterface
{
    /**
     * @var UserInterface
     */
    protected $userRepository;

    /**
     * ResetPasswordService constructor.
     * @param UserInterface $userRepository
     */
    public function __construct(UserInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * @param Request $request
     * @return bool|\Exception
     * @author Dung Thinh
     */
    public function execute(Request $request)
    {
        if (!$request->hasFile('avatar_file')) {
            return new Exception(trans('core.acl::users.error_update_profile_image'));
        }

        $user = $this->userRepository->findById($request->input('user_id'));

        $file = $request->file('avatar_file');
        $fileName = $file->getClientOriginalName();
        $fileExtension = $file->getClientOriginalExtension();

        $avatar = [
            'path' => config('core.acl.general.avatar.container_dir') . DIRECTORY_SEPARATOR . $user->username . '/full-' . str_slug(basename($fileName, $fileExtension)) . '-' . time() . '.' . $fileExtension,
            'realPath' => config('core.acl.general.avatar.container_dir') . DIRECTORY_SEPARATOR . $user->username . '/thumb-' . str_slug(basename($fileName, $fileExtension)) . '-' . time() . '.' . $fileExtension,
            'ext' => $fileExtension,
            'mime' => $request->file('avatar_file')->getMimeType(),
            'name' => $fileName,
            'user' => $user->id,
            'size' => $request->file('avatar_file')->getSize(),
        ];

        config()->set('filesystems.default', 'local');
        config()->set('filesystems.disks.local.root', config('core.base.general.upload.base_dir'));

        File::deleteDirectory(config('core.base.general.upload.base_dir') . DIRECTORY_SEPARATOR . config('core.acl.general.avatar.container_dir') . DIRECTORY_SEPARATOR . $user->username);
        Storage::disk()->put($avatar['path'], file_get_contents($request->file('avatar_file')->getRealPath()), 'public');

        $crop = new CropAvatar($request->input('avatar_src'), $request->input('avatar_data'), $avatar);
        $user->profile_image = $crop->getResult();
        $this->userRepository->createOrUpdate($user);

        return $crop->getResult();
    }
}
